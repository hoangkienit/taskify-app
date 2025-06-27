import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import UserController from '../controllers/user.controller';
import { Authenticate } from '../middlewares/auth.middleware';
import { updateUserProfileSchema } from '../validators/user.validator';

const router = express.Router();

router.get('/test', Authenticate, asyncHandler(UserController.getUser));

router.post('/update-profile', validate(updateUserProfileSchema), Authenticate, asyncHandler(UserController.updateUserProfile));

export default router;