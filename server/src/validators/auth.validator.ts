import Joi from 'joi';
import { TFunction } from 'i18next';

export const registerSchema = (t: TFunction) => Joi.object({
    username: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': t('auth-error.register.username-required'),
            'string.min': t('auth-error.register.username-atleast'),
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': t('auth-error.register.email-required'),
            'string.email': t('auth-error.register.email-invalid'),
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{9,12}$/)
        .required()
        .messages({
            'string.empty': t('auth-error.register.phone-required'),
            'string.pattern.base': t('auth-error.register.phone-invalid'),
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': t('auth-error.register.password-required'),
            'string.min': t('auth-error.register.password-atleast'),
        }),

    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .messages({
            'any.only': t('auth-error.register.password-match'),
            'any.required': t('auth-error.register.confirm-password-required'),
        }),
});
