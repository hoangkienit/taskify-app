import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { Authenticate } from '../middlewares/auth.middleware';
import { addFriendSchema } from '../validators/friend.validator';
import FriendController from '../controllers/friend.controller';

const router = express.Router();

router.post('/add-friend', validate(addFriendSchema), Authenticate, asyncHandler(FriendController.AddFriend));

router.get('/friend-list', Authenticate, asyncHandler(FriendController.GetFriends));

router.get('/friend-requests', Authenticate, asyncHandler(FriendController.GetFriendRequests));

export default router;