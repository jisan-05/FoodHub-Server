import express from "express";
import auth from "../auth";
import { categoryController } from "./category.controller";
const router = express.Router();

router.post("/", auth(), categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.patch("/:categoryId", auth(), categoryController.updateCategory);

router.delete("/:categoryId", auth(), categoryController.deleteCategory);

export const CategoryRouter = router;
