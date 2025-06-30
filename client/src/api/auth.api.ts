import api from "../configs/axios";
import type {
    ILoginRequest,
    IRegisterRequest,
    LoginResponse,
    RegisterResponse,
    LogoutResponse
} from "../interfaces/auth.interface";

export const LoginUser = async ({ username, password}: ILoginRequest): Promise<LoginResponse> => {
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

export const RegisterUser = async ({
    username,
    email,
    phone,
    password,
    confirmPassword
}: IRegisterRequest
): Promise<RegisterResponse> => {
    try {
        const response = await api.post(`/auth/register`, {
            username,
            email,
            phone,
            password,
            confirmPassword
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const LogoutUser = async (): Promise<LogoutResponse> => {
    try {
        const response = await api.get(`/auth/logout`, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const RefreshToken = async (): Promise<void> => {
    try {
        const response = await api.post(`/auth/refresh-token`, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
