import { Router } from "express";
import { ordersController } from "./orders.controller";
import auth from "../auth";

const router = Router()

router.get("/",auth(),ordersController.getProviderOrders)

router.patch("/:id",auth(),ordersController.updateOrderStatus)

export const ordersRouter = router