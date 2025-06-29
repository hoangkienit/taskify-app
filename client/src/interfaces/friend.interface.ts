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