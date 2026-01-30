import { prisma } from "../../lib/prisma";

const createProvider = async (
  payload: {
    restaurantName: string;
    address: string;
    description?: string;
    image?: string;
  },
  userId: string,
) => {
  try {
    const result = await prisma.providerProfile.create({
      data: {
        userId: userId,
        ...payload,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const providerService = {
  createProvider,
};
