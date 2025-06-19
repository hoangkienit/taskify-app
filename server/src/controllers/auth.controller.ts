import { Request, Response } from 'express';
import { NotFoundError } from '../core/error.response';

class AuthController {
    static async Login(req: Request, res: Response): Promise<void> {
        const t = req.t;
        res.status(200).json("Hello");
    }

    static async Register(req: Request, res: Response): Promise<void> {
        const {
            username,
            email,
            phone,
            password
        } = req.body;

        
        res.status(200).json("Hello world");
    }
}

export default AuthController;