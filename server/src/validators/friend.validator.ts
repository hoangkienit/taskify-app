import Joi from 'joi';
import { TFunction } from 'i18next';

export const addFriendSchema = (t: TFunction) => Joi.object({
    receiverId: Joi.string()
    .length(24)
    .hex()
    .required()
        .messages({
            'string.empty': "ID is required",
        }),
});
