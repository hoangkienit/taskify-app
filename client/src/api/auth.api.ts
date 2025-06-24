import api from "../configs/axios";

interface LoginResponse {
    success: boolean,
    message?: string,
    status?: number,
    data: Record<string, any>
}

interface RegisterResponse {
    success: boolean,
    message?: string,
    status?: number,
    data: object
}

interface IRegisterRequest {
    username: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
}

interface ILoginRequest {
    username: string,   
    password: string
}

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
