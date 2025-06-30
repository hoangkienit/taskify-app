import { io } from "socket.io-client";
import { RefreshToken } from "../api/auth.api";

const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
const socket = io(SOCKET_URL,
    {
        path: "/ws/socket.io",
        autoConnect: false,
        withCredentials: true,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
    }
);

socket.on("connect", () => {
    console.log("✅ Connected to WebSocket");
});

socket.on("disconnect", (reason) => {
    console.warn("⚠️ WebSocket Disconnected:", reason);
});

socket.on("connect_error", async (err) => {
    if (err.message === "Token expired") {
        try {
            await RefreshToken();
            socket.connect(); // retry after token is refreshed
        } catch (e) {
            console.error("Refresh failed", e);
        }
    }
});

export default socket;
