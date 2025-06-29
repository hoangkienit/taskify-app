import api from "../configs/axios";

export const AddFriend = async (receiverId: string) => {
    try {
        const response = await api.post(`/friend/add-friend`,
            {
                receiverId
            }
            ,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};