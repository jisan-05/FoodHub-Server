import { Request, Response } from "express";
import { profileService } from "./users.service";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await profileService.getMyProfile(userId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get my profile failed!",
      details: error,
    });
  }
};

const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, image } = req.body;
    const result = await profileService.updateMyProfile(
      userId as string,
      name,
      image,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "update profile failed!",
      details: error,
    });
  }
};

export const profileController = {
  getMyProfile,
  updateMyProfile,
};
