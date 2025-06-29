export interface IUser {
    _id: string;
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

