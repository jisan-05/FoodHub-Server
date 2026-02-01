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
const leaveReview = async () => {};
const getMyOrders = async () => {};
const updateProfile = async () => {};

export const CustomerService = {
  addToCart,
  placeOrder,
  leaveReview,
  getMyOrders,
  updateProfile,
};
