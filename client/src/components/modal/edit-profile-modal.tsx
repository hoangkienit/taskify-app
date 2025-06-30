import React, { useState } from 'react';
import './edit-profile-modal.css';
import type { TFunction } from 'i18next';
import { useUser } from '../../context/UserContext';
import ToastNotification, { showTopToast } from '../toast/toast';
import { isValidEmail, isValidVietnamesePhone } from '../../utils/validation';
import { handleApiError } from '../../utils/handleApiError';
import { Loading } from '../loader/loader';
import { UpdateUserProfile } from '../../api/user.api';

const avatarOptions = [
    'https://iampesmobile.com/uploads/user-avatar-taskify.jpg',
    'https://iampesmobile.com/uploads/user-avatar-taskify-02.jpg',
    'https://iampesmobile.com/uploads/user-avatar-taskify-03.jpg',
    'https://iampesmobile.com/uploads/user-avatar-taskify-04.jpg',
    'https://iampesmobile.com/uploads/user-avatar-taskify-05.jpg',
];

interface EditProfileModalProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    cancelButtonText?: string;
    confirmButtonText?: string;
    t: TFunction;
}

const EditProfileModal = ({
    title,
    isOpen,
    onCancel,
    cancelButtonText = 'Cancel',
    confirmButtonText = 'Confirm',
    t
}: EditProfileModalProps) => {
    const { user, setUser } = useUser();
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions.find(avatar => avatar === user?.profileImg) || avatarOptions[0]);
    const [email, setEmail] = useState(user?.email || "kiennguyen4321abc@gmail.com");
    const [phone, setPhone] = useState(user?.phone || "0903148910");
    const [loading, setLoading] = useState(false);

    const handleEditProfile = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const response = await UpdateUserProfile({
                email: email.trim(),
                phone: phone.trim(),
                avatar: selectedAvatar
            });

            setUser(response.data.user);
            showTopToast(t('edit-profile-success'), 'success', 3000);
            onCancel();
        } catch (error) {
            handleApiError(error, "Edit Profile Error");
        }
        finally {
            setLoading(false);
        }
    }

    const validateInputs = () => {
        if (!email.trim()) {
            showTopToast(t('edit-profile-error-empty-email'), 'error', 5000);
            return false;
        }

        if (!isValidEmail(email.trim())) {
            showTopToast(t('edit-profile-error-invalid-email'), 'error', 5000);
            return false;
        }

        if (!phone.trim()) {
            showTopToast(t('edit-profile-error-empty-phone'), 'error', 5000);
            return false;
        }
        if (!isValidVietnamesePhone(phone.trim())) {
            showTopToast(t('edit-profile-error-invalid-phone'), 'error', 5000);
            return false;
        }

        return true;
    }

    if (!isOpen) return null;

    return (
        <div className='edit-profile-modal__overlay' onClick={onCancel}>
            <div className="edit-profile-container">
                <h2 className="edit-profile-title">{title}</h2>

                <div className="edit-profile-avatar-section">
                    <img src={selectedAvatar} alt="Selected avatar" className="edit-profile-main-avatar" />
                    <div className="edit-profile-avatar-options">
                        {avatarOptions.map((avatar, idx) => (
                            <img
                                key={idx}
                                src={avatar}
                                alt={`Avatar ${idx}`}
                                className={`edit-profile-avatar-thumb ${selectedAvatar === avatar ? 'selected' : ''}`}
                                onClick={() => setSelectedAvatar(avatar)}
                            />
                        ))}
                    </div>
                </div>

                <form className="edit-profile-form">
                <div className="edit-profile-form-group">
                        <label>ID</label>
                        <input type="text" value={user?._id || "hoangkiendev"} disabled className='edit-profile-input' />
                    </div>
                    <div className="edit-profile-form-group">
                        <label>{t('username')}</label>
                        <input type="text" value={user?.username || "hoangkiendev"} disabled className='edit-profile-input' />
                    </div>

                    <div className="edit-profile-form-group">
                        <label>{t('email')}</label>
                        <input className='edit-profile-input' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="edit-profile-form-group">
                        <label>{t('phone')}</label>
                        <input className='edit-profile-input' type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="confirm-modal__actions">
                        <button className="confirm-modal__btn confirm-modal__btn--cancel" onClick={onCancel}>{cancelButtonText}</button>
                        {loading ? 
                            (<div className='edit-profile-loading'>
                                <Loading
                                color={"#fff"}
                                size={20}
                                loading={loading}
                            />
                            </div>)
                        : (
                            <button
                            className="confirm-modal__btn confirm-modal__btn--confirm"
                            onClick={handleEditProfile}>
                            {confirmButtonText}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
