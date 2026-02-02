import { Request, Response } from "express";
import { ordersService } from "./orders.service";

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await ordersService.getProviderOrders(id as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get Provider all Orders failed!",
      details: error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const userId = req.user?.id
    const orderId = req.params.id
    const result = await ordersService.updateOrderStatus(status, userId as string,orderId as string)
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get Provider all Orders failed!",
      details: error,
    });
  }
}

export const ordersController = {
  getProviderOrders,
  updateOrderStatus
};
