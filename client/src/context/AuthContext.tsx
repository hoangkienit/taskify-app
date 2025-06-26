import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { IUser } from "../interfaces/user.interface";
import { useUser } from "./UserContext";

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    login: (user: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const {user, setUser} = useUser();
    const isAuthenticated = !!user;

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (userData: IUser) => {
        setUser(userData);
    };

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, setUser, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 5. Custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
