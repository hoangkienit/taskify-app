import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { TFunction } from 'i18next';

export const validate = (schemaBuilder: (t: TFunction) => Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const t = req.t;
        const schema = schemaBuilder(t);

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message)[0];
            res.status(400).json({ errors });
            return;
        }

        next();
    };
};