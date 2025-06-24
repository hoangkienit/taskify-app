export interface User {
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