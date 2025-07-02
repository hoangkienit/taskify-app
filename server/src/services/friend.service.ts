import { TFunction } from "i18next";
import { getIO } from "../config/socket";
import { BadRequestError } from "../core/error.response";
import User from "../models/user.model";
import Friend from "../models/friend.model";
import mongoose from "mongoose";
import { convertToObjectId } from "../utils";
import { IFriend, IFriendRequest, IGetFriendRequestsResponse, IGetFriendsResponse } from "../interfaces/friend.interface";
import FriendRequest from "../models/friend-request.model";
import Notification from "../models/notification.model";

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

        // Save notification
        const newNotification = new Notification({
            receiverId: recipient._id,
            type: "friend_request",
            content: `${requestUser?.username}`,
            link: "/friends"
        });

        await newNotification.save();

        const io = getIO();
        io.to(recipient._id.toString()).emit("friend-request", {
            userId: requesterId,
            username: requestUser?.username,
            profileImg: requestUser?.profileImg,
            requestedAt: newFriendRequest.requestedAt
        });

        io.to(recipient._id.toString()).emit("notification:new", newNotification);

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
            _id: req._id.toString(),
            username: req.sender.username,
            profileImg: req.sender.profileImg,
            requestedAt: req.requestedAt
        })) || [];


        return {
            requests: requests || []
        }

    }

    static async AcceptFriendRequest(requestId: string): Promise<void> {
        const request = await FriendRequest.findOne({ _id: convertToObjectId(requestId) });
        if (!request) throw new BadRequestError("Friend request not found");

        await Friend.updateOne(
            { _id: request.receiver },
            { $addToSet: { friends: request.sender } },
            { upsert: true }
        );

        await Friend.updateOne(
            { _id: request.sender },
            { $addToSet: { friends: request.receiver } },
            { upsert: true }
        );

        const receiver = await User.findOne({_id: request.receiver}).lean();
        const requester = await User.findOne({_id: request.sender}).lean();


        // Delete after accepted
        await FriendRequest.findOneAndDelete({
            sender: request.sender,
            receiver: request.receiver,
            status: "pending"
        });

        // Save notification
        const newNotification = new Notification({
            receiverId: request._id,
            type: "friend_accept",
            content: `${requester?.username}`,
            link: "/friends"
        });

        const io = getIO();
        io.to(request.sender.toString()).emit("friend-request-accepted", {
            userId: receiver?._id,
            username: receiver?.username,
            profileImg: receiver?.profileImg,
            requestedAt: ""
        });

        io.to(request.sender.toString()).emit("notification:new", newNotification);

        return;
    }
}

export default FriendService;