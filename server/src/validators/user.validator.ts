import Joi from 'joi';
import { TFunction } from 'i18next';

export const updateUserProfileSchema = (t: TFunction) => Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': t('user-error.update-profile.email-required'),
            'string.email': t('user-error.update-profile.email-invalid'),
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{9,12}$/)
        .required()
        .messages({
            'string.empty': t('user-error.update-profile.phone-required'),
            'string.pattern.base': t('user-error.update-profile.phone-invalid'),
        }),
    avatar: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': t('user-error.update-profile.avatar-required'),
            'string.uri': t('user-error.update-profile.avatar-invalid'),
        }),
});

export const changePasswordSchema = (t: TFunction) => Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            'string.empty': t('user-error.change-password.current-password-required'),
        }),
    newPassword: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': t('user-error.change-password.new-password-required'),
            'string.min': t('user-error.change-password.new-password-length'),
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'string.empty': t('user-error.change-password.confirm-new-password-required'),
            'any.only': t('user-error.change-password.password-mismatch'),
        }),
});

