import express, { Router } from 'express';
import auth, { UserRole } from '../auth';
import { adminController } from './admin.controller';
const router = express.Router()

router.get("/",auth(UserRole.ADMIN),adminController.getAllOrders)

export const AdminRouter = router