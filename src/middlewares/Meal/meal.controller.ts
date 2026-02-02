import { Request, Response } from "express";
import { mealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("You are Unauthorized");
    }
    const userId = req.user.id;
    const result = await mealService.createMeal(req.body, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Meal Create failed!",
      details: error,
    });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const { categoryId, minPrice, maxPrice, mealName } = req.query;
    console.log(categoryId, minPrice, maxPrice, mealName);
    const minPriceNumber =
      req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;

    const maxPriceNumber =
      req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    const result = await mealService.getAllMeals(
      categoryId as string,
      minPriceNumber,
      maxPriceNumber,
      mealName as string,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Get Meals failed!",
      details: error,
    });
  }
};

const getMealById = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    const result = await mealService.getMealById(mealId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get single meal failed!",
      details: error,
    });
  }
};

const updateMeals = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    const result = await mealService.updateMeals(mealId as string, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Meal Update failed!",
      details: error,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;
    const result = await mealService.deleteMeal(mealId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Meal Delete failed!",
      details: error,
    });
  }
};

export const mealController = {
  createMeal,
  getAllMeals,
  updateMeals,
  getMealById,
  deleteMeal,
};
