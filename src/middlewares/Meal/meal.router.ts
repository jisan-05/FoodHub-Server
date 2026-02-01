import express, { Router } from 'express';

import auth from '../auth';
import { mealController } from './meal.controller';
const router = express.Router()

router.post("/",auth(),mealController.createMeal)

router.get("/",auth(),mealController.getAllMeals)

router.get("/:mealId",auth(),mealController.getMealById)

router.patch("/:mealsId",auth(),mealController.updateMeals)

export const MealRouter = router 