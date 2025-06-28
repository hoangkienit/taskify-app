export interface IUser {
    userId: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    profileImg?: string;
    isActive?: boolean;
    isBanned?: boolean;
    isVerified?: boolean;
    plan?: string;
}

export interface IUpdateUserProfile {
    email: string;
    phone: string;
    avatar?: string;
}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IFriend {
    userId: string;
    username: string;
    profileImg: string;
    createdAt: Date
}

export interface IFriendListProps {
    friend: IFriend
}