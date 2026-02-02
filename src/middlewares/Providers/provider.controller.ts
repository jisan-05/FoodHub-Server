import { Request, Response } from "express";
import { providerService } from "./provider.service";

const createProvider = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const userId = req.user.id;
    const result = await providerService.createProvider(req.body, userId);
    res.status(201).json(result);
  } catch (error) {
     res.status(400).json({
      error: "provider create failed!",
      details: error,
    });
  }
};

const getAllProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getAllProvider();
    res.status(200).json(result);
  } catch (error) {
     res.status(400).json({
      error: "Get Provider failed!",
      details: error,
    });
  }
};

const getProviderById = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const result = await providerService.getProviderById(providerId as string);
    res.status(200).json(result);
  } catch (error) {
     res.status(400).json({
      error: "get single Provider failed!",
      details: error,
    });
  }
};

export const ProviderController = {
  createProvider,
  getAllProvider,
  getProviderById,
};
