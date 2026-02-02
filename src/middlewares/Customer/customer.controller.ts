import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

const addToCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return;
    }
    const userId = req.user.id;
    const result = await CustomerService.addToCart(req.body, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "add To Card failed!",
      details: error,
    });
  }
};

const placeOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const userId = req.user.id;
    const result = await CustomerService.placeOrder(req.body, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Place Order failed!",
      details: error,
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const customerId = req.user?.id;
    const result = await CustomerService.getMyOrders(customerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get my orders failed!",
      details: error,
    });
  }
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
    res.status(400).json({
      error: "get single orders failed!",
      details: error,
    });
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
    res.status(400).json({
      error: "Create Reviews failed!",
      details: error,
    });
  }
};

export const customerController = {
  addToCart,
  placeOrder,
  getMyOrders,
  getSingleOrder,
  leaveReview,
};
