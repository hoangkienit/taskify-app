import { Request, Response } from "express";
import { OK } from "../core/success.response";


class UserController {
    static async getUser(req: Request, res: Response): Promise<void> {
        
        new OK({
            message: req.t("user-success.get-user"),
            data: {
                user: "Nguyen Hoang Kien"
            }
        }).send(res);
    }
}

export default UserController;