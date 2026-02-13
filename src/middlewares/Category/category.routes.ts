import express from "express";
import auth, { UserRole } from "../auth";
import { categoryController } from "./category.controller";
const router = express.Router();

router.post("/", auth(), categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.patch("/:categoryId", auth(UserRole.ADMIN), categoryController.updateCategory);

router.delete("/:categoryId", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const CategoryRouter = router;
