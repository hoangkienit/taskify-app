import React, { useState } from 'react';
import './change-password-modal.css';
import type { TFunction } from 'i18next';
import { Loading } from '../loader/loader';
import { ChangePassword } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: TFunction;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    isOpen,
    onClose,
    t
}) => {
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            setLoading(true);

            const response = await ChangePassword({
                currentPassword: current,
                newPassword: newPass,
                confirmPassword: confirm
            });

            if (response.success) {
                navigate('/logout?reason=change_password', { replace: true });
            }

        } catch (error) {
            
        }
        finally {
            setLoading(false)
        }
    };

    const validateInputs = () => {
        if (!current.trim()) {
            setError(t('change-password-error-empty-current'));
            return false;
        }

        if (!newPass.trim()) {
            setError(t('change-password-error-empty-new'));
            return false;
        }

        if (!confirm.trim()) {
            setError(t('change-password-error-empty-confirm'));
            return false;
        }

        if (newPass !== confirm) {
            setError(t('change-password-error-mismatch'));
            return false;
        }

        if (newPass.length < 6) {
            setError(t('change-password-error-length'));
            return false;
        }

        return true;

    }

    if (!isOpen) return null;

    return (
        <div className="change-password-modal__backdrop" onClick={onClose}>
            <div className="change-password-modal__container" onClick={(e) => e.stopPropagation()}>
                <button className="change-password-modal__close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2 className="change-password-modal__title">{t('password-change-title')}</h2>
                <form onSubmit={handleSubmit} className="change-password-modal__form">
                    <label className="change-password-modal__label">
                        {t('current-password')}
                        <input
                            type="text"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                            className="change-password-modal__input"
                        />
                    </label>
                    <label className="change-password-modal__label">
                        {t('new-password')}
                        <input
                            type="text"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="change-password-modal__input"
                        />
                    </label>
                    <label className="change-password-modal__label">
                        {t('confirm-new-password')}
                        <input
                            type="text"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="change-password-modal__input"
                        />
                    </label>
                    {error && <p className="change-password-modal__error">{error}</p>}
                    {loading ?
                        (<div className='change-password-loading'>
                            <Loading
                                color={"#fff"}
                                size={20}
                                loading={loading}
                            />
                        </div>)
                        : (
                            <button type="submit" className="change-password-modal__submit-btn">
                        {t('change-password-button')}
                    </button>
                        )}
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
