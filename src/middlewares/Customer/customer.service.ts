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
const placeOrder = async (
  data: { orderId: string; address: string },
  userId: string,
) => {
  const { orderId, address } = data;
  // Find the order
  const order = await prisma.order.findFirst({
    where: { id: orderId, customerId: userId, status: "PLACED" },
    include: { orderItems: true },
  });

  if (!order) throw new Error("Cart not found or already checked out");

  if (order.orderItems.length === 0) throw new Error("Cart is empty");

  // 2️⃣ Update order with delivery address
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      address,
      status: "PLACED", // still PLACED for provider to see
    },
  });

  return updatedOrder;
};
const getMyOrders = async (customerId: string) => {
  
  const result = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      provider: {
        select: {
          restaurantName: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result
};

const getSingleOrder = async(orderId:string,customerId:string)=>{
  const order = await prisma.order.findFirst({
  where: {
    id: orderId,
    customerId: customerId
  },
  include: {
    orderItems: {
      include: {
        meal: true
      }
    },
    provider: true
  }
})
return order
}

const leaveReview = async (payload:any,userId:string) => {
  const order = await prisma.order.findFirst({
  where: {
    id: payload.orderId
  },
  include: {
    orderItems: true
  }
})
console.log(order);
if (order?.status !== "DELIVERED") {
  throw new Error("You can review only after delivery")
}

const orderedMealIds = order.orderItems.map(i => i.mealId)

if (!orderedMealIds.includes(payload.mealId)) {
  throw new Error("You did not order this meal")
}

const result = await prisma.review.create({
  data: {
    mealId:payload.mealId,
    userId: userId,
    rating:payload.rating,
    comment:payload.comment
  }
})
return result

};
const updateProfile = async () => {};

export const CustomerService = {
  addToCart,
  placeOrder,
  leaveReview,
  getMyOrders,
  updateProfile,
  getSingleOrder
};
