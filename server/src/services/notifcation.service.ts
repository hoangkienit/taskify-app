import Notification from "../models/notification.model";
import { convertToObjectId } from "../utils";


class NotificationService {
    static async GetNotifications(userId: string, limit: number = 8) {
        const notifications = await Notification.find({
            receiverId: convertToObjectId(userId)
        })
        .limit(limit)
        .sort({ createdAt: -1})
        .lean();

        return notifications || [];
    }
}

export default NotificationService;