import { Router } from "express";
import { profileController } from "./users.controller";
import auth, { UserRole } from "../auth";

const router = Router()

router.get("/me",auth(),profileController.getMyProfile)

router.get("/",auth(UserRole.ADMIN),profileController.getAllUser)

router.patch("/me",auth(),profileController.updateMyProfile)

router.patch("/",auth(UserRole.ADMIN),profileController.updateUserStatus)

export const profileRouter = router