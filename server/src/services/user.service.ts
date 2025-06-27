import { NotFoundError } from "../core/error.response";
import User from "../models/user.model";
import { convertToObjectId } from "../utils";


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
}

export default UserService;