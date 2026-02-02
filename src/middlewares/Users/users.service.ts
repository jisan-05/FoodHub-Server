import { prisma } from "../../lib/prisma";

const getMyProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result;
};
const updateMyProfile = async (userId: string, name: string, image: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      name: name,
      image: image,
    },
  });
  return result;
};

export const profileService = {
  getMyProfile,
  updateMyProfile,
};
