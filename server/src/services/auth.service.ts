import { TFunction } from "i18next";
import User from "../models/user.model";
import { BadRequestError, NotFoundError } from "../core/error.response";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { LoginRequest, LoginResponse, RegisterRequest } from "../interfaces/auth.interface";
import Friend from "../models/friend.model";

class AuthService {
    private static async checkUserExists(field: string, value: string, t: TFunction, errorMsg: string) {
        const exists = await User.findOne({ [field]: value }).lean();
        if (exists) {
            throw new BadRequestError(t(errorMsg));
        }
    }

    static async Login(
        { username, password }: LoginRequest,
        t: TFunction
    ): Promise<LoginResponse> {
        const user = await User.findOne({ username }).lean();
        if (!user) {
            throw new NotFoundError(t("auth-error.login.username-not-existed"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundError(t("auth-error.login.password-wrong"));
        }

        // Generate JWT tokens
        const accessToken = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '30m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '7d' }
        );

        // Remove sensitive fields
        const { password: _, __v, ...safeUser } = user;

        return {
            accessToken,
            refreshToken,
            user: safeUser
        };
    }

    static async Register(
        { username, email, phone, password, confirmPassword }: RegisterRequest,
        t: TFunction
    ): Promise<boolean> {
        // Check for existing username, email, phone
        await this.checkUserExists('username', username, t, "auth-error.register.username-existed");
        await this.checkUserExists('email', email, t, "auth-error.register.email-existed");
        await this.checkUserExists('phone', phone, t, "auth-error.register.phone-existed");

        if (password !== confirmPassword) {
            throw new NotFoundError(t("auth-error.register.password-not-match"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        const friend = new Friend({
            userId: newUser._id,
            friends: []
        });

        await friend.save();

        return true;
    }
}

export default AuthService;