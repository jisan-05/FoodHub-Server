import express, { Router } from 'express';
import auth from '../auth';
import { customerController } from './customer.controller';
const router = express.Router()

router.post("/cart/add",auth(),customerController.addToCart)

router.post("/orders/checkout",auth(),customerController.placeOrder)

router.get("/orders/status/:id",auth(),customerController.placeOrder)

router.get("/orders",auth(),customerController.getMyOrders)

router.get("/orders/:orderId",auth(),customerController.getSingleOrder)

router.post("/reviews",auth(),customerController.leaveReview)

export const CustomerRouter = router