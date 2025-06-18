import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schemaFn: (t: any) => Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const t = req.t; // i18next-express-middleware attaches this
        const schema = schemaFn(t);
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    };
};
