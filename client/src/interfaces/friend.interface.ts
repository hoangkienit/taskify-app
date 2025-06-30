export interface IFriend {
    userId: string;
    username: string;
    profileImg: string;
    createdAt: Date
}

export interface IFriendListProps {
    friend: IFriend
}

export interface IAddFriendModalProps {
    onClose: () => void;
    onAddFriend: (usernameOrId: string) => void;
    isOpen: boolean;
}

export interface IFriendRequest {
    _id: string;
    username: string;
    profileImg: string;
    requestedAt: string | Date;
}

export interface IFriendRequestModalProps {
    isOpen: boolean;
    requests: IFriendRequest[];
    onClose: () => void;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}