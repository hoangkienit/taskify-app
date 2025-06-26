import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import UserController from '../controllers/user.controller';
import { Authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/test', Authenticate, asyncHandler(UserController.getUser));

export default router;