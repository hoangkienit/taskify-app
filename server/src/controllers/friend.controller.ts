import { Response, Request } from "express";
import { UnauthorizedError } from "../core/error.response";
import FriendService from "../services/friend.service";
import { OK } from "../core/success.response";


class FriendController {
    static async addFriend(req: Request, res: Response): Promise<void> {
        const {
            receiverId
        } = req.body;

        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        } 

        const requesterId = req.user.userId;
        const t = req.t;

        await FriendService.addFriend(receiverId, requesterId, t);

        new OK({
            message: t('friend-success.add-success'),
            data: {}
        }).send(res);
    }
}

export default FriendController;