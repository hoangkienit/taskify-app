import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './main-header.css';
import { IoMdNotifications } from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import ConfirmModal from '../modal/confirm-modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../modal/edit-profile-modal';
import { RiLockPasswordFill } from "react-icons/ri";
import ChangePasswordModal from '../modal/change-password-modal';
import ToastNotification, { showFriendRequestToast, showTopToast } from '../toast/toast';
import socket from '../../configs/socket';
import type { INotification } from '../../interfaces/notification.interface';
import { formatTimeAgo } from '../../utils';
import { handleApiError } from '../../utils/handleApiError';
import { GetNotifications } from '../../api/notification.api';
import type { IFriendRequest } from '../../interfaces/friend.interface';

type OpenPopup = null | "notifications" | "actions";

export const MainHeader: React.FC = () => {
    const { user } = useUser();
    const { t } = useTranslation("header");
    const actionRef = useRef<HTMLDivElement>(null);
    const [showNotificationBadge, setShowNotificationBadge] = useState(false);
    const [notifications, setNotifications] = useState<INotification[]>([]);


    // State for modals
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);
    const [openPopup, setOpenPopup] = useState<OpenPopup>(null);

    const navigate = useNavigate();


    useEffect(() => {
        fetchNotifications();

        const handleClickOutside = (e: MouseEvent) => {
            if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
                setOpenPopup(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("friend-request", (friendRequest: IFriendRequest) => {
                showFriendRequestToast({
                    from: friendRequest.username,
                    avatar: friendRequest.profileImg,
                    time: friendRequest.requestedAt,
                    onClick: () => navigate('/friends'),
                    t: t
                });
            });

            socket.on("notification:new", (notification: INotification) => {
                setNotifications(prev => [{
                    ...notification,
                    content: `${notification.content} ${t('sent-a-friend-request')}`
                }, ...prev]);
            });

            return () => {
                socket.off("friend-request");
                socket.off("notification:new");
            }
        }
    }, [socket]);

    useEffect(() => {
        if(notifications.find(noti => noti.isRead === false)){
            setShowNotificationBadge(true);
        }else setShowNotificationBadge(false);
    }, [notifications]);

    const fetchNotifications = async() => {
        try {
            const notificationResponse = await GetNotifications(8);

            if(notificationResponse.success){
                setNotifications(notificationResponse.data.notifications);
            }
        } catch (error) {
            handleApiError(error, "Error in Notifications");
        }
    }

    const handleLogout = () => {
        navigate('/logout', { replace: true });
    }

    const menuItems = [
        {
            name: t('profile-title'), icon: <FaUserCircle />, action: () => {
                setOpenPopup(null);
                setIsEditProfileModalOpen(true);
            }
        },
        {
            name: t('password-change-title'), icon: <RiLockPasswordFill />, action: () => {
                setIsChangePasswordModalOpen(true);
                setOpenPopup(null);
            }
        },
        {
            name: t('logout-title'), icon: <RiLogoutBoxRFill />, action: () => {
                setIsLogoutModalOpen(true);
                setOpenPopup(null);
            }
        }
    ];


    const test = () => {
        showFriendRequestToast({
            from: "Kien",
            avatar: "https://iampesmobile.com/uploads/user-avatar-taskify.jpg",
            time: "2025-06-30T06:23:20.622Z",
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
                        onClick={() => setOpenPopup(prev => (prev === "notifications" ? null : "notifications"))}
                    />
                    {
                        showNotificationBadge && <div className='notification-count-container'>
                        </div>
                    }
                </div>
                <img
                    src={user?.profileImg || '/default-avatar.png'}
                    alt="User Avatar"
                    className="main-manage-header-user-avatar"
                    onClick={() => setOpenPopup(prev => (prev === "actions" ? null : "actions"))}
                />
                {openPopup === "actions" && (
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

                {openPopup === "notifications" && (
                    <div className="notification-dropdown">
                        {notifications.length === 0 ? (
                            <div className="notification-empty">{t('no-notification')}</div>
                        ) : (
                            notifications.map(noti => (
                                <div
                                    key={noti._id}
                                    className={`notification-item ${noti.isRead ? '' : 'unread'}`}
                                    onClick={() => {}}
                                >
                                    <div className="notification-content">{noti.content}</div>
                                    <div className="notification-time">{formatTimeAgo(noti.createdAt, t)}</div>
                                </div>
                            ))
                        )}
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
