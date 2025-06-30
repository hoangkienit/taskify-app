import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import UserController from '../controllers/user.controller';
import { Authenticate } from '../middlewares/auth.middleware';
import { changePasswordSchema, updateUserProfileSchema } from '../validators/user.validator';

const router = express.Router();

router.post('/update-profile', validate(updateUserProfileSchema), Authenticate, asyncHandler(UserController.UpdateUserProfile));

router.post('/change-password', validate(changePasswordSchema), Authenticate, asyncHandler(UserController.ChangePassword));

export default router;