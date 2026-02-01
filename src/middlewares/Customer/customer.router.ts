import express, { Router } from 'express';
import auth from '../auth';
import { customerController } from './customer.controller';
const router = express.Router()

router.post("/cart/add",auth(),customerController.addToCart)

router.post("/orders/checkout",auth(),customerController.placeOrder)

export const CustomerRouter = router