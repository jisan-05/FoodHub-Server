import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getMyProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result;
};

const getAllUser = async()=>{
  const result = await prisma.user.findMany()
  return result
}

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

const updateUserStatus = async (userId: string, status:UserStatus) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      userStatus:status
    },
  });
  return result;
};

export const profileService = {
  getMyProfile,
  updateMyProfile,
  getAllUser,
  updateUserStatus
};
