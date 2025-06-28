import { TFunction } from "i18next";
import { NotFoundError } from "../core/error.response";
import User from "../models/user.model";
import { convertToObjectId } from "../utils";
import bcrypt from 'bcrypt';


class UserService {
    static async updateUserProfile(userId: string, email: string, phone: string, avatar: string) {
        const user = await User.findOne({ _id: convertToObjectId(userId) });
        if (!user) {
            throw new NotFoundError(`User with id ${userId} not found`);
        }

        user.email = email;
        user.phone = phone;
        user.profileImg = avatar;

        await user.save();
        return user;
    }

    static async changePassword(userId: string, currentPassword: string, newPassword: string, t: TFunction) {
        const user = await User.findOne({ _id: convertToObjectId(userId) });
        if (!user) {
            throw new NotFoundError(`User with id ${userId} not found`);
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new NotFoundError(t("change-password.current-password-not-match"));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();
        return user;
    }
}

export default UserService;