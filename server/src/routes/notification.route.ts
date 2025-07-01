import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { Authenticate } from '../middlewares/auth.middleware';
import NotificationController from '../controllers/notification.controller';

const router = express.Router();

router.get('/notification-list', Authenticate, asyncHandler(NotificationController.GetNotifications));

export default router;