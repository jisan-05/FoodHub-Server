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

const getAllProvider = async () => {
  return await prisma.providerProfile.findMany();
};

const getProviderById = async (providerId: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id: providerId,
    },
    include:{
      meals:true
    }
  });
  return result;
};

export const providerService = {
  createProvider,
  getAllProvider,
  getProviderById,
};
