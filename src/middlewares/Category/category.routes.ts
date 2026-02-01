import express, { Router } from 'express';
import { categoryController } from './category.controller';
import auth from '../auth';
const router = express.Router()

router.post("/",auth(),categoryController.createCategory)

router.get("/",auth(),categoryController.getAllCategories)

export const CategoryRouter = router