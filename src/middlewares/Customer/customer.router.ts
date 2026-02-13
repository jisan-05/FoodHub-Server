import express from "express";
import auth, { UserRole } from "../auth";
import { customerController } from "./customer.controller";
const router = express.Router();

router.post("/cart/add", auth(), customerController.addToCart);

router.post("/orders/checkout", auth(), customerController.placeOrder);

router.get("/orders/status/:id", auth(), customerController.placeOrder);

router.get("/orders", auth(), customerController.getMyOrders);

router.get("/orders-cart",auth(), customerController.getMyOrdersCard);

router.get("/orders/:orderId", auth(), customerController.getSingleOrder);

router.post("/reviews", auth(UserRole.USER), customerController.leaveReview);

router.get("/reviews", customerController.getReviews);

export const CustomerRouter = router;
