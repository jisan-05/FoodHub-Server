import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async(req:Request,res:Response)=>{
  try {
    const result = await categoryService.createCategory(req.body)
    res.status(201).json(result)
  } catch (error) {
   res.status(400).json({
      error: "create category failed!",
      details: error,
    });
  }
}

const getAllCategories= async(req:Request,res:Response)=>{
  try {
    
    const result = await categoryService.getAllCategories()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({
      error: "get all category failed!",
      details: error,
    });
  }
}

const updateCategory = async(req:Request,res:Response)=>{
  try {
    const {categoryId} = req.params
    const result = await categoryService.updateCategory(categoryId as string,req.body)
    res.status(201).json(result)
  } catch (error) {
   res.status(400).json({
      error: "create category failed!",
      details: error,
    });
  }
}

const deleteCategory = async(req:Request,res:Response)=>{
  try {
    const {categoryId} = req.params
    const result = await categoryService.deleteCategory(categoryId as string)
    res.status(201).json(result)
  } catch (error) {
   res.status(400).json({
      error: "create category failed!",
      details: error,
    });
  }
}

export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
}