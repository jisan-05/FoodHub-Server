import { Router } from "express";
import { ordersController } from "./orders.controller";
import auth from "../auth";

const router = Router()

router.get("/",auth(),ordersController.getProviderOrders)

export const ordersRouter = router