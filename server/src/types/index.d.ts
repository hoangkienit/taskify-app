import 'express';
import { TFunction } from 'i18next';

declare module 'express' {
    export interface Request {
        t: TFunction;
    }
}