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

export const ordersService = {
  getProviderOrders,
};
