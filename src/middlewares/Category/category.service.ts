import { prisma } from "../../lib/prisma"

type CreateCategoryPayload = {
  name: string;          // required
  description?: string;  // optional
  image?: string;        // optional
};

const createCategory = async(payload:CreateCategoryPayload)=>{
  const result = await prisma.category.create({
    data:{
      ...payload
    }
  })
  return result;
}

const getAllCategories = async() =>{
  return await prisma.category.findMany()
}

export const categoryService = {
  createCategory,
  getAllCategories
}