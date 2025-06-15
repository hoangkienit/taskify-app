import "./header.css";
import LOGO from "./../../assets/images/logo/Taskify.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../language-switcher/language-switcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("header");

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="top-header">
                <div className="top-header-action">
                    <p className="top-header-action-title">{ t('privacy-policy')}</p>
                    <p className="top-header-action-title">{ t('term-of-service')}</p>
                </div>
                <LanguageSwitcher/>
            </div>
            <div className="main-header">
                <div className="bottom-header">
                    <div className="header-left">
                        <img src={LOGO} className="main-logo-img" alt="Logo" />
                        <ul className="header-nav-list">
                            <li className="header-nav-item">{t('about-us')}</li>
                            <li className="header-nav-item">{ t('pricing')}</li>
                            <li className="header-nav-item">{ t('contact')}</li>
                        </ul>
                    </div>
                    <div className="header-right">
                        <button
                            onClick={() => navigate('/login')}
                            className="header-login-button"
                        >
                            {t('login-button')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
