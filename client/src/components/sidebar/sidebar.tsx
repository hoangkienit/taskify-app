import React, { useState } from 'react';
import './sidebar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import LOGO from './../../assets/images/logo/Taskify_Web_Logo.png';
import { IoHome } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { FaFolder } from "react-icons/fa";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: 'Home', path: '/', icon: <IoHome className='sidebar-menu-icon'/> },
        { name: 'Projects', path: '/dashboard', icon: <FaFolder  className='sidebar-menu-icon'/> },
        { name: 'Friends', path: '/settings', icon: <RiTeamFill className='sidebar-menu-icon'/> },
        { name: 'Logout', path: '/logout', icon: <IoHome className='sidebar-menu-icon'/> },
    ];

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
                <div className="brand-logo-section">
                    <img src={LOGO} alt="Brand Logo" className="sidebar-brand-logo" />
                </div>
                <div className="toggle-btn" onClick={toggleSidebar}>
                    <GiHamburgerMenu />
                </div>
                <ul className="menu">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.path} className={`tooltip-container ${isOpen && 'menu-item-collapsed'}`}>
                                {item.icon}
                                {!isOpen && <span className="menu-text">{item.name}</span>}
                                <span className="tooltip-text">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
