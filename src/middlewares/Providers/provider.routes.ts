import express, { Router } from 'express';
import { ProviderController } from './provider.controller';
import auth, { UserRole } from '../auth';

const router = express.Router()

router.post("/profile",auth(),ProviderController.createProvider)

router.get("/profile",auth(),ProviderController.getAllProvider)


export const ProviderRouter:Router = router