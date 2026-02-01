import express, { Router } from 'express';
import { ProviderController } from './provider.controller';
import auth, { UserRole } from '../auth';

const router = express.Router()

router.post("/",auth(),ProviderController.createProvider)

router.get("/",auth(),ProviderController.getAllProvider)

router.get("/:providerId",auth(),ProviderController.getProviderById)


export const ProviderRouter:Router = router