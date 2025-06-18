import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { registerSchema } from '../validators/auth.validator';

const router = express.Router();

router.post('/login', AuthController.Login);

router.post('/register', validate(registerSchema), AuthController.Register);

export default router;