import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

const addToCart = async(req:Request,res:Response)=>{
  if(!req.user){
    return 
  }
  const userId = req.user.id
  const result = await CustomerService.addToCart(req.body,userId) 
  res.status(201).json(result)
}

const placeOrder = async(req:Request,res:Response)=>{
  if(!req.user){
    return
  }
  const userId = req.user.id
  const result = await CustomerService.placeOrder(req.body,userId)
  res.status(201).json(result)
}

export const customerController = {
  addToCart,
  placeOrder
}