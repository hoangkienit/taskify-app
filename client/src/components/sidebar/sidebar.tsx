import React, { useState } from 'react';
import './sidebar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import LOGO from './../../assets/images/logo/Taskify.png';
import { IoHome } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { FaFolder } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdMessage } from "react-icons/md";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/manage-dashboard', icon: <IoHome className='sidebar-menu-icon' /> },
        { name: 'Projects', path: '/projects', icon: <FaFolder className='sidebar-menu-icon' /> },
        { name: 'Friends', path: '/friends', icon: <RiTeamFill className='sidebar-menu-icon' /> },
        { name: 'Inboxes', path: '/inboxes', icon: <MdMessage className='sidebar-menu-icon' /> },
    ];

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
                <div className="sidebar-header-section">
                    {!isOpen && (<div className="brand-logo-section">
                        <img src={LOGO} alt="Brand Logo"
                            className={`sidebar-brand-logo ${!isOpen ? '' : ''}`} />
                    </div>)}
                    <div className={`toggle-btn ${!isOpen ? '' : 'toggle-button-collapsed'}`} onClick={toggleSidebar}>
                        <GiHamburgerMenu />
                    </div>
                </div>
                <ul className="menu">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.path}
                                className={`tooltip-container ${isOpen && 'menu-item-collapsed'} ${isActive(item.path) && "sidebar-menu-selected"}`
                                }>
                                {item.icon}
                                {!isOpen && <span className="menu-text">{item.name}</span>}
                                {isOpen && <div className="tooltip-text">
                                    <p className="tooltip-text-title">
                                        {item.name}
                                    </p>
                                </div>}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
