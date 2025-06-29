import { TFunction } from "i18next";
import { getIO } from "../config/socket";
import { BadRequestError } from "../core/error.response";
import User from "../models/user.model";
import Friend from "../models/friend.model";


class FriendService {
    static async addFriend(
        receiverId: string,
        requesterId: string,
        t: TFunction
    ) {
        const recipient = await User.findOne({
            $or: [{ username: receiverId }, { _id: receiverId }],
            _id: { $ne: requesterId }
        });

        if (!recipient) throw new BadRequestError(t('friend-error.not-found'));

        const requestUser = await User.findOne({ _id: requesterId }).lean();

        const friendDoc = await Friend.findOne({ userId: requesterId });

        const isFriend = friendDoc?.friends.includes(recipient._id);

        if (isFriend) throw new BadRequestError(t('friend-error.already-friend'));

        const io = getIO();
        io.to(recipient._id.toString()).emit("test", {
            userId: requesterId,
            username: requestUser?.username,
            profileImg: requestUser?.profileImg
        });

        return true;
    }
}

export default FriendService;