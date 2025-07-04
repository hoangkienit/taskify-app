import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { IUser } from "../interfaces/user.interface";
import socket from "../configs/socket";


interface UserContextType {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(() => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }

        // For socket
        if (user?._id) {
            socket.connect();
            console.log(import.meta.env.VITE_WEBSOCKET_URL)
            socket.emit("join", user._id);
        } else {
            socket.disconnect();
        }

        return () => {
            socket.off();
        };
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
