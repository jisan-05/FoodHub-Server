import express, { Router } from 'express';
import auth from '../auth';
import { adminController } from './admin.controller';
const router = express.Router()

router.get("/",auth(),adminController.getAllOrders)

export const AdminRouter = router