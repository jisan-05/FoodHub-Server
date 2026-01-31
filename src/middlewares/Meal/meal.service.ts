import { prisma } from "../../lib/prisma";

// Type for creating a new Meal
type CreateMealPayload = {
  name: string; // required
  description?: string; // optional
  price: number; // required
  image?: string; // optional
  categoryId: string; // required, links to Category
};

const createMeal = async (payload: CreateMealPayload, userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: userId },
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  // 2️⃣ Create meal using providerProfile.id
  const result = await prisma.meal.create({
    data: {
      ...payload,
      providerId: providerProfile.id,
    },
  });

  return result;

  // console.log({});
};

export const mealService = {
  createMeal,
};
