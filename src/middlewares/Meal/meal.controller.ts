import { Request, Response } from "express";
import { mealService } from "./meal.service";


const createMeal = async(req:Request,res:Response)=>{
  try {
    if(!req.user){
      throw new Error("You are Unauthorized")
    }
    const userId = req.user.id
    const result = await mealService.createMeal(req.body,userId)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
  }
}

export const mealController = {
  createMeal
}