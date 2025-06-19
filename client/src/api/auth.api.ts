import api from "../configs/axios";

interface LoginResponse {
    success: boolean,
    data: {
        accessToken: string,
        user: {
            userId: string,
            username: string,
            email: string,
            phone: string,
        }
    }
}

export const LoginUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post(`/auth/login`, {
            username,
            password
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
