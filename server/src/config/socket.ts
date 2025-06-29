import { Server, Socket } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import logger from "./logger";
import { JwtPayload } from "../interfaces/auth.interface";

// Extend the socket type to include user
interface AuthenticatedSocket extends Socket {
    user?: JwtPayload;
}

let io: Server;

export const initializeSocket = (server: http.Server): Server => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
        path: "/ws/socket.io",
    });

    console.log("🟢 Socket.io server initialized");

    // Middleware to authenticate using cookies
    io.use((socket: AuthenticatedSocket, next) => {
        try {
            const cookies = socket.request.headers.cookie;
            if (!cookies) {
                logger.error("❌ Authentication error: No cookies sent");
                return next(new Error("No cookies found"));
            }

            const parsedCookies = cookie.parse(cookies);
            const token = parsedCookies.accessToken;

            if (!token) {
                logger.error("❌ Authentication error: Token not found in cookies");
                return next(new Error("No token provided"));
            }

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
            
            socket.user = user;
            next();
        } catch (error: any) {
            logger.error("❌ Authentication error:", error.message);
            return next(new Error("Token expired or invalid"));
        }
    });

    io.on("connection", (socket: AuthenticatedSocket) => {
        console.log(`🔌 Client connected: ${socket.id}, User: ${socket.user?.username}`);

        socket.on("join", (room: string) => {
            socket.join(room);
        });

        socket.on("admin_join", () => {
            socket.join("admin_room");
        });

        socket.on("disconnect", () => {
            console.log("🔌 Client disconnected:", socket.id);
        });
    });

    return io;
};

export const getIO = (): Server => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};
