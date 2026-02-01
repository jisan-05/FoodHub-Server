import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async(req:Request,res:Response)=>{
  try {
    const result = await categoryService.createCategory(req.body)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
  }
}

const getAllCategories= async(req:Request,res:Response)=>{
  try {
    
    const result = await categoryService.getAllCategories()
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

export const categoryController = {
  createCategory,
  getAllCategories
}