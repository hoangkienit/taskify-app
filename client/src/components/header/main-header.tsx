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
import { RiLockPasswordFill } from "react-icons/ri";
import ChangePasswordModal from '../modal/change-password-modal';
import ToastNotification, { showFriendRequestToast, showTopToast } from '../toast/toast';
import socket from '../../configs/socket';

export const MainHeader: React.FC = () => {
    const { user } = useUser();
    const { t } = useTranslation("header");
    const [showActions, setShowActions] = useState<boolean>(false);
    const actionRef = useRef<HTMLDivElement>(null);

    // State for modals
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);

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

    useEffect(() => {
        if (socket) {
            socket.on("friend-request", (userId, username, profileImg, time) => {
                showFriendRequestToast({
                    from: username,
                    avatar: profileImg,
                    time: time,
                    onClick: () => navigate('/friends'),
                    t: t
                });
            });

            return () => {
                socket.off("test", () => { });
            }
        }
    }, [socket]);

    const handleLogout = () => {
        navigate('/logout', { replace: true });
    }

    const menuItems = [
        {
            name: t('profile-title'), icon: <FaUserCircle />, action: () => {
                setShowActions(false);
                setIsEditProfileModalOpen(true);
            }
        },
        {
            name: t('password-change-title'), icon: <RiLockPasswordFill />, action: () => {
                setIsChangePasswordModalOpen(true);
                setShowActions(false);
        } },
        {
            name: t('logout-title'), icon: <RiLogoutBoxRFill />, action: () => {
                setIsLogoutModalOpen(true);
                setShowActions(false);
        } }
    ];

    const onAccept = () => {

    }

    const onReject = () => {
        
    }

    const test = () => {
        showFriendRequestToast({
            from: "Kien",
            avatar: "https://iampesmobile.com/uploads/user-avatar-taskify.jpg",
            time:  "2025-06-30T06:23:20.622Z",
            onClick: () => navigate('/friends'),
            t: t
        });
    }


    return (
        <div className="main-manage-header">
            <button onClick={test}>fsdfsfds</button>
            <div className="user-detail-section" ref={actionRef}>
                <div className="main-header-notification-section">
                    <IoMdNotifications
                        className="main-manage-header-notification-icon"
                        onClick={() => {}}
                    />
                    <div className='notification-count-container'>
                    </div>
                </div>
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

            {/** Change password modal */}
            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setIsChangePasswordModalOpen(false)}
                t={t}
            />
        </div>
    );
};
