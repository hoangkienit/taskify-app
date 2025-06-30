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