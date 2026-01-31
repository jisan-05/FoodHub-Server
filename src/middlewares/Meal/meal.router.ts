import express, { Router } from 'express';

import auth from '../auth';
import { mealController } from './meal.controller';
const router = express.Router()

router.post("/",auth(),mealController.createMeal)

export const MealRouter = router 