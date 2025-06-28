import api from "../configs/axios";
import type { IChangePassword, IUpdateUserProfile } from "../interfaces/user.interface";

export const GetUser = async () => {
    try {
        const response = await api.get(`/user/test`, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateUserProfile = async ({ email, phone, avatar }: IUpdateUserProfile) => {
    try {
        const response = await api.post(`/user/update-profile`,
            {
                email,
                phone,
                avatar
            },
            {
                withCredentials: true
            });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const ChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword
}: IChangePassword) => {
    try {
        const response = await api.post(`/user/change-password`,
            {
                currentPassword,
                newPassword,
                confirmPassword
            },
            {
                withCredentials: true
            });

        return response.data;
    } catch (error) {
        throw error;
    }
};