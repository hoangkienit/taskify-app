import { Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import AuthService from '../services/auth.service';

class AuthController {
    static async Login(req: Request, res: Response): Promise<void> {
        const t = req.t;

        const response = await AuthService.Login(req.body, t);     
        res.cookie("accessToken", response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        new OK({
            message: t("auth-success.login"),
            data: {
                user: response.user
            }
        }).send(res);
    }

    static async Register(req: Request, res: Response): Promise<void> {
        const t = req.t;

        await AuthService.Register(req.body, t);
        
        new CREATED({
            message: t("auth-success.register"),
            data: {}
        }).send(res);
    }
}

export default AuthController;