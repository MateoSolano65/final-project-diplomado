import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import {
  authRegisterCheck,
  authLoginCheck,
} from '../validators/auth.validator.js';

const prefix = '/auth';

const router = Router();

router.post(`${prefix}/register`, authRegisterCheck, authController.register);

router.post(`${prefix}/login`, authLoginCheck, authController.login);

export default router;
