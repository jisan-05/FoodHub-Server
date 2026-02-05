import { Meal } from "../../../generated/prisma/client";
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
  const providerProfile = await prisma.providerProfile.findFirst({
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
};

const getAllMeals = async (
  categoryId?: string,
  minPrice?: number,
  maxPrice?: number,
  mealName?: string,
) => {
  console.log(categoryId, minPrice, maxPrice, mealName);

  // Convert min/max price to numbers
  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  const where: any = {};

  if (categoryId) where.categoryId = categoryId;

  if (mealName) {
    where.name = { contains: mealName, mode: "insensitive" };
  }

  if (min !== undefined || max !== undefined) {
    where.price = {};
    if (min !== undefined) where.price.gte = min;
    if (max !== undefined) where.price.lte = max;
  }

  return await prisma.meal.findMany({
    where,
  });
};

const getMealById = async (mealId: string) => {
  return await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });
};

const updateMeals = async (mealsId: string, data: Partial<Meal>) => {
  const mealsData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealsId,
    },
    select: {
      id: true,
    },
  });
  const result = await prisma.meal.update({
    where: {
      id: mealsData.id,
    },
    data: {
      ...data,
    },
  });
  return result;
};

const deleteMeal = async (mealsId: string) => {
  const result = await prisma.meal.delete({
    where: {
      id: mealsId,
    },
  });

  return result;
};

export const mealService = {
  createMeal,
  getAllMeals,
  updateMeals,
  getMealById,
  deleteMeal,
};
