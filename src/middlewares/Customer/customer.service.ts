import { prisma } from "../../lib/prisma";

// customer.service.ts
const addToCart = async (payload: any, userId: string) => {
  // find the meal
  const meal = await prisma.meal.findUniqueOrThrow({
    where: {
      id: payload.mealId,
    },
  });

  // Find if user already has a cart (Order with status PLACED)
  let order = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: "PLACED",
      providerId: meal.providerId,
    },
  });

  // If no cart exists, create one
  if (!order) {
    order = await prisma.order.create({
      data: {
        customerId: userId,
        providerId: meal.providerId,
        status: "PLACED",
        address: "", // fill on checkout
      },
    });
  }

  //  Add meal to OrderItem
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.id,
      mealId: meal.id,
      quantity: payload.quantity,
      price: meal.price * payload.quantity,
    },
  });

  return { order, orderItem };
};
// customer.service.ts
const placeOrder = async (
  data: { address: string },
  userId: string
) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
      status: "PLACED",
    },
    include: {
      orderItems: true,
    },
  });

  if (orders.length === 0) {
    throw new Error("No cart found");
  }

  for (const order of orders) {
    if (order.orderItems.length === 0) continue;

    // 1️⃣ Update order with address & mark as checked out
    await prisma.order.update({
      where: { id: order.id },
      data: {
        address: data.address,
        status: "PLACED", // or "CHECKED_OUT" if you want separate status
      },
    });

    // 2️⃣ Delete all orderItems (empty the cart)
    await prisma.orderItem.deleteMany({
      where: {
        orderId: order.id,
      },
    });

    // 3️⃣ Optionally delete the order itself (cart cleared)
    await prisma.order.delete({
      where: { id: order.id },
    });
  }

  return { message: "Checkout completed and cart cleared ✅" };
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
  console.log(payload);
  const order = await prisma.order.findFirst({
    where: {
      id: payload.orderId,
    },
    include: {
      orderItems: true,
    },
  });
  // console.log(order);
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
};
