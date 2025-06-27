import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './main-header.css';
import { IoMdNotifications } from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import ConfirmModal from '../modal/confirm-modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../modal/edit-profile-modal';
import ToastNotification, { showTopToast } from '../toast/toast';

export const MainHeader: React.FC = () => {
    const { user } = useUser();
    const { t } = useTranslation("header");
    const [showActions, setShowActions] = useState<boolean>(false);
    const actionRef = useRef<HTMLDivElement>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
                setShowActions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        navigate('/logout', { replace: true });
    }

    const menuItems = [
        {
            name: 'Profile', icon: <FaUserCircle />, action: () => {
                setShowActions(false);
                setIsEditProfileModalOpen(true);
            }
        },
        { name: 'Settings', icon: <IoMdSettings />, action: () => console.log('Settings clicked') },
        {
            name: 'Logout', icon: <RiLogoutBoxRFill />, action: () => {
                setIsLogoutModalOpen(true);
                setShowActions(false);
        } }
    ];


    return (
        <div className="main-manage-header">
            <div className="user-detail-section" ref={actionRef}>
                <IoMdNotifications className="main-manage-header-notification-icon" />
                <img
                    src={user?.profileImg || '/default-avatar.png'}
                    alt="User Avatar"
                    className="main-manage-header-user-avatar"
                    onClick={() => setShowActions((prev) => !prev)}
                />
                {showActions && (
                    <div className="user-action-popup">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="user-action-item"
                                onClick={item.action}
                            >
                                {item.icon}
                                <p className='user-action-text'>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/** Log out modal */}
            <ConfirmModal
                title={t('logout-title')}
                message={t('logout-message')}
                isOpen={isLogoutModalOpen}
                onCancel={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
                cancelButtonText={t('cancel-button')}
                confirmButtonText={t('confirm-button')}
            />

            {/** Edit profile modal */}
            <EditProfileModal
                title={t('edit-profile-title')}
                isOpen={isEditProfileModalOpen}
                onCancel={() => {
                    setIsEditProfileModalOpen(false)
                }}
                cancelButtonText={t('cancel-button')}
                confirmButtonText={t('save-button')}
                t={t}
            />
        </div>
    );
};
