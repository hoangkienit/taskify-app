import { Response, Request } from "express";
import { UnauthorizedError } from "../core/error.response";
import FriendService from "../services/friend.service";
import { OK } from "../core/success.response";


class FriendController {
    static async AddFriend(req: Request, res: Response): Promise<void> {
        const {
            receiverId
        } = req.body;

        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        }

        const requesterId = req.user.userId;
        const t = req.t;

        await FriendService.AddFriend(receiverId, requesterId, t);

        new OK({
            message: t('friend-success.add-success'),
            data: {}
        }).send(res);
    }

    static async GetFriends(req: Request, res: Response): Promise<void> {
        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        }

        const userId = req.user.userId;

        const response = await FriendService.GetFriends(userId);

        new OK({
            message: "Get friends successfully",
            data: {
                friends: response.friends,
                requests: response.requests
            }
        }).send(res);
    }
}

export default FriendController;