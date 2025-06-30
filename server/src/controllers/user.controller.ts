import { Request, Response } from "express";
import { OK } from "../core/success.response";
import UserService from "../services/user.service";
import { UnauthorizedError } from "../core/error.response";


class UserController {
    static async UpdateUserProfile(req: Request, res: Response): Promise<void> {
        const { email, phone, avatar } = req.body;
        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        }
        const userId = req.user.userId;

        const user = await UserService.UpdateUserProfile(userId, email, phone, avatar);

        new OK({
            message: req.t("user-success.update-profile"),
            data: {
                user: user
            }
        }).send(res);
    }

    static async ChangePassword(req: Request, res: Response): Promise<void> {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!req.user || !req.user.userId) {
            throw new UnauthorizedError("User not authenticated");
        }

        if (newPassword !== confirmPassword) {
            throw new UnauthorizedError(req.t("user-error.change-password.password-mismatch"));
        }

        const userId = req.user.userId;

        const user = await UserService.ChangePassword(userId, currentPassword, newPassword, req.t);

        new OK({
            message: req.t("user-success.change-password"),
            data: {
                user: user
            }
        }).send(res);
    }
}

export default UserController;