import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

const addToCart = async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const userId = req.user.id;
  const result = await CustomerService.addToCart(req.body, userId);
  res.status(201).json(result);
};

const placeOrder = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({
      error: "Unauthorized!",
    });
  }
  const userId = req.user.id;
  const result = await CustomerService.placeOrder(req.body, userId);
  res.status(201).json(result);
};

const getMyOrders = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({
      error: "Unauthorized!",
    });
  }
  const customerId = req.user?.id;
  const result = await CustomerService.getMyOrders(customerId);
  res.status(200).json(result);
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
    const { orderId } = req.params;
    if (!orderId) {
      return;
    }
    const result = await CustomerService.getSingleOrder(
      orderId as string,
      customerId as string,
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const leaveReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await CustomerService.leaveReview(
      req.body,
      userId as string,
    );
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const customerController = {
  addToCart,
  placeOrder,
  getMyOrders,
  getSingleOrder,
  leaveReview,
};
