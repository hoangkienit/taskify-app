import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/login', validate(loginSchema), asyncHandler(AuthController.Login));

router.post('/register', validate(registerSchema), asyncHandler(AuthController.Register));

export default router;