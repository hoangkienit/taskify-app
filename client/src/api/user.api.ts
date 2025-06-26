import api from "../configs/axios";

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