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

export const GetFriends = async () => {
    try {
        const response = await api.get(`/friend/friend-list`
            ,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetFriendRequests = async () => {
    try {
        const response = await api.get(`/friend/friend-requests`
            ,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const AcceptFriendRequest = async (requestId: string) => {
    try {
        const response = await api.post(`/friend/accept`,{
            requestId
        }
            ,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}