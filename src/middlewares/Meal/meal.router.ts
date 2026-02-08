import express, { Router } from 'express';

import auth from '../auth';
import { mealController } from './meal.controller';
const router = express.Router()

router.post("/",auth(),mealController.createMeal)

router.get("/",mealController.getAllMeals)

router.get("/provider/:providerId",mealController.getMealsByProvider)

router.get("/:mealId",mealController.getMealById)

router.patch("/:mealId",auth(),mealController.updateMeals)

router.delete("/:mealId",auth(),mealController.deleteMeal)

export const MealRouter = router 