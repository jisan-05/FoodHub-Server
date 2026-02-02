import { Router } from "express";
import { profileController } from "./users.controller";
import auth from "../auth";

const router = Router()

router.get("/me",auth(),profileController.getMyProfile)

router.patch("/me",auth(),profileController.updateMyProfile)

export const profileRouter = router