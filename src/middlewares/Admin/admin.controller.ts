import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllOrders= async(req:Request,res:Response)=>{
  try {
    
    const result = await adminService.getAllOrders()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({
      error: "get all category failed!",
      details: error,
    });
  }
}

export const adminController = {
    getAllOrders
}