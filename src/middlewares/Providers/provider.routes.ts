import express, { Router } from 'express';
import { ProviderController } from './provider.controller';
import auth, { UserRole } from '../auth';

const router = express.Router()

router.post("/profile",auth(),ProviderController.createProvider)


export const ProviderRouter:Router = router