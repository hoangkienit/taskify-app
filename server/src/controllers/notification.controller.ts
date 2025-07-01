import { Request, Response } from "express";
import { BadRequestError } from "../core/error.response";
import NotificationService from "../services/notifcation.service";
import { OK } from "../core/success.response";


class NotificationController {
    static async GetNotifications(req: Request, res: Response): Promise<void> {
        if(!req.user || !req.user.userId){
            throw new BadRequestError("User not authenticate");
        }

        const userId = req.user.userId;
        const limit = req.query.limit as string;

        const notifications = await NotificationService.GetNotifications(userId, parseInt(limit));

        new OK({
            message: "Get notifications success",
            data: {
                notifications: notifications
            }
        }).send(res);
    }
}

export default NotificationController;