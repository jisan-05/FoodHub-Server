import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getProviderOrders = async (providerId: string) => {
  const provider: any = await prisma.providerProfile.findUnique({
    where: {
      userId: providerId,
    },
  });

  const result = await prisma.order.findMany({
    where: {
      providerId: provider.id,
    },
    include: {
      orderItems: {
        include: { meal: true },
      },
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const updateOrderStatus = async(status:OrderStatus,userId:string,orderId:string)=>{
   // 1️⃣ Find provider
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: userId}
  })

  // 2️⃣ Find order
  const order = await prisma.order.findUnique({
    where: { id:orderId}
  })


  if(!order){
    return
  }

  // 4️⃣ Update status
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status
    } 
  })
  return updatedOrder
}

export const ordersService = {
  getProviderOrders,
  updateOrderStatus
};
