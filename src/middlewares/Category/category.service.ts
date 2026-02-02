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

const updateCategory = async(categoryId:string,payload:CreateCategoryPayload)=>{
  const result = await prisma.category.update({
    where:{
      id:categoryId
    },
    data:{
      ...payload
    }
  })
  return result;
}

const deleteCategory = async(categoryId:string)=>{
  return await prisma.category.delete({
    where:{
      id:categoryId
    }
  })
  
}

export const categoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
}