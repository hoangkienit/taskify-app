
import api from "../configs/axios";

export const GetNotifications = async (limit: number) => {
    try {
        const response = await api.get(`/notification/notification-list?limit=${limit}`
            ,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};