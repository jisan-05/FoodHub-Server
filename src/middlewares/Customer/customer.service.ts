import { prisma } from "../../lib/prisma";

// customer.service.ts
const addToCart = async (payload: any, userId: string) => {
  const meal = await prisma.meal.findUniqueOrThrow({ where: { id: payload.mealId } });

  // Find or create cart order
  let order = await prisma.order.findFirst({
    where: { customerId: userId, status: "PLACED", providerId: meal.providerId },
  });

  if (!order) {
    order = await prisma.order.create({
      data: { customerId: userId, providerId: meal.providerId, status: "PLACED", address: "" },
    });
  }

  // Check if meal already in cart
  const existingCartItem = await prisma.orderItemForCart.findFirst({
    where: { orderId: order.id, mealId: meal.id },
  });

  if (existingCartItem) {
    // Update quantity
    await prisma.orderItemForCart.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + payload.quantity, price: meal.price * (existingCartItem.quantity + payload.quantity) }
    });
  } else {
    // Add new cart item
    await prisma.orderItemForCart.create({
      data: { orderId: order.id, mealId: meal.id, quantity: payload.quantity, price: meal.price * payload.quantity },
    });
  }

  return { message: "Added to cart ✅" };
};

// customer.service.ts
const placeOrder = async (data: { address: string }, userId: string) => {
  const carts = await prisma.order.findMany({
    where: { customerId: userId },
    include: { orderItemForCarts: true }
  });

  if (!carts.length) throw new Error("No cart found");

  for (const cart of carts) {
    if (!cart.orderItemForCarts.length) continue;

    // 1️⃣ Move cart items to orderItems
    const orderItemsData = cart.orderItemForCarts.map(item => ({
      orderId: cart.id,
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.price,
    }));

    await prisma.orderItem.createMany({ data: orderItemsData });

    // 2️⃣ Update order with address and mark as checked out
    await prisma.order.update({
      where: { id: cart.id },
      data: { address: data.address, status: "PLACED" },
    });

    // 3️⃣ Clear the cart items
    await prisma.orderItemForCart.deleteMany({ where: { orderId: cart.id } });
  }

  return { message: "Checkout completed ✅" };
};



const getMyOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      orderItems: {
        include: {
          meal: true, // includes meal details for each order item
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};
const getMyOrdersCard = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      // Include regular order items
      orderItems: {
        include: {
          meal: true,
        },
      },
      // Include cart order items
      orderItemForCarts: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


const getSingleOrder = async (orderId: string, customerId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: customerId,
    },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      provider: true,
    },
  });
  return order;
};

const leaveReview = async (payload: any, userId: string) => {

  const order = await prisma.order.findFirst({
    where: {
      id: payload.orderId,
    },
    include: {
      orderItems: true,
    },
  });

  if (order?.status !== "DELIVERED") {
    throw new Error("You can review only after delivery");
  }

  const orderedMealIds = order.orderItems.map((i) => i.mealId);

  if (!orderedMealIds.includes(payload.mealId)) {
    throw new Error("You did not order this meal");
  }

  const result = await prisma.review.create({
    data: {
      mealId: payload.mealId,
      userId: userId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
  return result;
};

const getReviews = async()=>{
  return await prisma.review.findMany()
}

const updateProfile = async () => {};

export const CustomerService = {
  addToCart,
  placeOrder,
  leaveReview,
  getReviews,
  getMyOrders,
  updateProfile,
  getSingleOrder,
  getMyOrdersCard
};
