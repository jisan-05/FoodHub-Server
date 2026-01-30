import { Request, Response } from "express";
import { providerService } from "./provider.service";

const createProvider = async ( req:Request,res:Response)=>{
  try {
    if(!req.user){
      return res.status(400).json({
        error:"Unauthorized"
      })
    }
    const userId = req.user.id
    const result = await providerService.createProvider(req.body,userId)
    res.status(201).json(result)

  } catch (error) {
    console.log(error);
  }
}

export const ProviderController = {
  createProvider
}