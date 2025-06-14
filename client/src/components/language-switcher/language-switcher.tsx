import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";
import "./language-switcher.css";

const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const current = languages.find((l) => l.code === i18n.language) || languages[0];

    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (lng: string) => {
        i18n.changeLanguage(lng);
        setOpen(false);
    };

    return (
        <div className="lang-dropdown">
            <button className="lang-trigger" onClick={toggleDropdown}>
                <span>{current.flag} {current.label}</span>
                <FaChevronDown className={`arrow-icon ${open ? "rotate" : ""}`} />
            </button>

            {open && (
                <ul className="lang-menu">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            className={`lang-item ${i18n.language === lang.code ? "active" : ""}`}
                            onClick={() => handleSelect(lang.code)}
                        >
                            {lang.flag} {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
