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

export const categoryService = {
  createCategory
}