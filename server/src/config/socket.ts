import { Server, Socket } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
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

    console.log("🟢 Socket.io server initialized: ", process.env.CLIENT_URL);

    // Middleware to authenticate using cookies
    io.use((socket: AuthenticatedSocket, next) => {
        try {
            // Debug logging
            // console.log("🔍 Socket authentication attempt:");
            // console.log("Headers:", socket.handshake.headers);
            // console.log("Cookie header:", socket.handshake.headers.cookie);

            const rawCookie = socket.handshake.headers.cookie;

            if (!rawCookie || typeof rawCookie !== "string") {
                const errorMsg = "No cookies sent";
                logger.error(`❌ Authentication error: ${errorMsg}`);
                // console.log("❌ No cookie header found");
                return next(new Error(errorMsg));
            }

            // console.log("📝 Raw cookie:", rawCookie);

            const parsedCookies = cookie.parse(rawCookie);
            // console.log("🍪 Parsed cookies:", parsedCookies);
            // console.log("🔑 Available cookie keys:", Object.keys(parsedCookies));

            const token = parsedCookies.accessToken;

            if (!token) {
                const errorMsg = "Token not found in cookies";
                logger.error(`❌ Authentication error: ${errorMsg}`);
                // console.log("❌ accessToken not found in cookies");
                // console.log("Available cookies:", Object.keys(parsedCookies));
                return next(new Error(errorMsg));
            }

            // console.log("🎫 Token found:", token.substring(0, 20) + "...");

            // Verify JWT token
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
            // console.log("✅ Token verified for user:", user.username);

            socket.user = user;
            next();
        } catch (error: any) {
            // Better error handling
            let errorMessage = "Authentication failed";
            
            if (error.name === 'JsonWebTokenError') {
                errorMessage = "Invalid token format";
            } else if (error.name === 'TokenExpiredError') {
                errorMessage = "Token expired";
            } else if (error.name === 'NotBeforeError') {
                errorMessage = "Token not active yet";
            } else if (error.message) {
                errorMessage = error.message;
            }

            logger.error("❌ Authentication error:", {
                error: errorMessage,
                errorType: error.name,
                errorDetails: error.message,
                timestamp: new Date().toISOString()
            });

            console.log("❌ JWT Verification failed:", {
                errorName: error.name,
                errorMessage: error.message,
                hasSecret: !!process.env.JWT_ACCESS_SECRET
            });

            return next(new Error(errorMessage));
        }
    });

    io.on("connection", (socket: AuthenticatedSocket) => {
        console.log(`🔌 Client connected: ${socket.id}, User: ${socket.user?.username}`);

        socket.on("join", (room: string) => {
            console.log(`👥 User ${socket.user?.username} joining room: ${room}`);
            socket.join(room);
        });

        socket.on("admin_join", () => {
            console.log(`👑 Admin ${socket.user?.username} joining admin room`);
            socket.join("admin_room");
        });

        socket.on("disconnect", (reason) => {
            console.log(`🔌 Client disconnected: ${socket.id}, User: ${socket.user?.username}, Reason: ${reason}`);
        });

        // Handle authentication errors
        socket.on("error", (error) => {
            console.log("❌ Socket error:", error);
            logger.error("Socket error:", error);
        });
    });

    // Global error handler
    io.engine.on("connection_error", (err) => {
        console.log("❌ Connection error:", err);
        logger.error("Socket.io connection error:", {
            message: err.message,
            description: err.description,
            context: err.context,
            type: err.type
        });
    });

    return io;
};

export const getIO = (): Server => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};