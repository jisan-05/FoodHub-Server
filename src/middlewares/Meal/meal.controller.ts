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

const getAllMeals = async(req:Request,res:Response)=>{
  try {
    const result = await mealService.getAllMeals()
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

const getMealById = async(req:Request,res:Response)=>{
  try {
    const {mealId} = req.params
    
    const result = await mealService.getMealById(mealId as string)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

const updateMeals = async(req:Request,res:Response)=>{
  try {
    const {mealsId} = req.params
    
    const result = await mealService.updateMeals(mealsId as string,req.body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

export const mealController = {
  createMeal,
  getAllMeals,
  updateMeals,
  getMealById
}