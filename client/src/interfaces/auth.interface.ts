
export interface LoginResponse {
    success: boolean,
    message?: string,
    status?: number,
    data: Record<string, any>
}

export interface LogoutResponse {
    success: boolean,
    message?: string,
    status?: number,
    data: Record<string, any>
}

export interface RegisterResponse {
    success: boolean,
    message?: string,
    status?: number,
    data: object
}

export interface IRegisterRequest {
    username: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
}

export interface ILoginRequest {
    username: string,   
    password: string
}