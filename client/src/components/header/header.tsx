import "./header.css";
import LOGO from "./../../assets/logo/Taskify.png";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setIsAuthPopupOpen(false);
            }
        };

        if (isAuthPopupOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAuthPopupOpen]);

    return (
        <div className="main-header">
            <div className="header-left">
                <img src={LOGO} className="main-logo-img" alt="Logo" />
                <ul className="header-nav-list">
                    <li className="header-nav-item">About Us</li>
                    <li className="header-nav-item">Resource</li>
                    <li className="header-nav-item">Pricing</li>
                </ul>
            </div>
            <div className="header-right">
                <button
                    onClick={() => setIsAuthPopupOpen(!isAuthPopupOpen)}
                    className="header-login-button"
                >
                    Login
                </button>

                {isAuthPopupOpen && (
                    <>
                        <div className="auth-popup-blur" />
                        <div
                            ref={popupRef}
                            className={`auth-popup ${isAuthPopupOpen ? "fade-in" : "fade-out"}`}
                        >
                            <p>Hello</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
