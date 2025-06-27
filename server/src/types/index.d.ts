import 'express';
import { TFunction } from 'i18next';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
    export interface Request {
        t: TFunction;
        user?: JwtPayload & {
            userId: string;
            username: string;
            role: string;
        }
    }
}