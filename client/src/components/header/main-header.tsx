import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './main-header.css';
import { IoMdNotifications } from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";

export const MainHeader: React.FC = () => {
    const { user } = useUser();
    const [showActions, setShowActions] = useState<boolean>(false);
    const actionRef = useRef<HTMLDivElement>(null);

    // Hide popup if clicked outside
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

    const handleLogout = async() => {

    }

    const menuItems = [
        { name: 'Profile', icon: <FaUserCircle />, action: () => console.log('Profile clicked') },
        { name: 'Settings', icon: <IoMdSettings />, action: () => console.log('Settings clicked') },
        { name: 'Logout', icon: <RiLogoutBoxRFill />, action: handleLogout }
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
                            <div key={index} className="user-action-item">
                                {item.icon}
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
