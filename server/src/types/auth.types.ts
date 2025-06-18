
export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
    accessToken: string;
    user: {
        id: string;
        username: string;
        email: string;
        phone: string;
    };
}
