import { Request, Response } from "express";
import { OK } from "../core/success.response";
import UserService from "../services/user.service";
import { UnauthorizedError } from "../core/error.response";


class UserController {
    static async getUser(req: Request, res: Response): Promise<void> {
        
        new OK({
            message: req.t("user-success.get-user"),
            data: {
                user: "Nguyen Hoang Kien"
            }
        }).send(res);
    }

    static async updateUserProfile(req: Request, res: Response): Promise<void> {
        const { email, phone, avatar } = req.body;
        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        }
        const userId = req.user.userId;

        const user = await UserService.updateUserProfile(userId, email, phone, avatar);

        new OK({
            message: req.t("user-success.update-profile"),
            data: {
                user: user
            }
        }).send(res);
    }
}

export default UserController;