import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { IUser } from "../interfaces/user.interface";


interface UserContextType {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
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
