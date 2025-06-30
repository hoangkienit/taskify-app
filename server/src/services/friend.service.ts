import { TFunction } from "i18next";
import { getIO } from "../config/socket";
import { BadRequestError } from "../core/error.response";
import User from "../models/user.model";
import Friend from "../models/friend.model";
import mongoose from "mongoose";
import { convertToObjectId } from "../utils";
import { IFriend, IFriendRequest, IGetFriendRequestsResponse, IGetFriendsResponse } from "../interfaces/friend.interface";
import FriendRequest from "../models/friend-request.model";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

class FriendService {
    static async AddFriend(
        receiverId: string,
        requesterId: string,
        t: TFunction
    ) {
        const recipient = await User.findOne({
            $or: [{ username: receiverId }, ...(isValidObjectId(receiverId)
                ? [{ _id: new mongoose.Types.ObjectId(receiverId) }]
                : [])]
        });

        if (!recipient) throw new BadRequestError(t('friend-error.not-found'));

        const requestUser = await User.findOne({ _id: requesterId }).lean();

        if (recipient._id.toString() === requestUser?._id.toString())
            throw new BadRequestError("You cannot add yourself");

        // Check if already sent request
        const existingRequest = await FriendRequest.findOne({
            sender: requestUser?._id,
            receiver: recipient._id,
            status: 'pending',
        });
        if (existingRequest) {
            throw new BadRequestError(t('friend-error.already-sent'));
        }

        const friendDoc = await Friend.findOne({ userId: requesterId });

        const isFriend = friendDoc?.friends.includes(recipient._id);

        if (isFriend) throw new BadRequestError(t('friend-error.already-friend'));

        const newFriendRequest = new FriendRequest({
            sender: requestUser?._id,
            receiver: recipient?._id
        });

        await newFriendRequest.save();

        const io = getIO();
        io.to(recipient._id.toString()).emit("friend-request", {
            userId: requesterId,
            username: requestUser?.username,
            profileImg: requestUser?.profileImg,
            time: newFriendRequest.requestedAt
        });

        return true;
    }

    static async GetFriends(userId: string): Promise<IGetFriendsResponse> {
        const friendsDoc = await Friend.findById(convertToObjectId(userId))
            .populate({
                path: 'friends',
                select: '_id username profileImg createdAt'
            })
            .lean();

        const requests = await FriendRequest.find({
            receiver: convertToObjectId(userId),
            status: 'pending'
        })
            .populate({
                path: 'sender',
                model: 'User',
                select: '_id username profileImg'
            })
            .sort({ requestedAt: -1 })
            .lean();

        // Format this Friend ID to string because the interface is string
        const friends: IFriend[] = friendsDoc?.friends?.map((friend: any) => ({
            _id: friend._id.toString(),
            username: friend.username,
            profileImg: friend.profileImg,
            createdAt: friend.createdAt
        })) || [];

        return {
            friends: friends,
            requests: requests.length
        }
    }

    static async GetFriendRequests(userId: string): Promise<IGetFriendRequestsResponse> {
        const requestDoc = await FriendRequest.find({
            receiver: convertToObjectId(userId),
            status: "pending"
        }).populate("sender", "_id username profileImg")
            .sort({ requestAt: -1 }).lean();

        const requests: IFriendRequest[] = requestDoc?.map((req: any) => ({
            _id: req.sender._id.toString(),
            username: req.sender.username,
            profileImg: req.sender.profileImg,
            requestedAt: req.requestedAt
        })) || [];


        return {
            requests: requests || []
        }

    }
}

export default FriendService;