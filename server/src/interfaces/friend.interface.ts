export interface IFriend {
    _id: string,
    username: string;
    profileImg: string;
    createdAt: string | Date;
}

export interface IGetFriendsResponse {
    friends: IFriend[],
    requests: number;
}

export interface IFriendRequest extends Omit<IFriend, 'createdAt'> {
    requestedAt: string | Date;
}

export interface IGetFriendRequestsResponse {
    requests: IFriendRequest[];
}