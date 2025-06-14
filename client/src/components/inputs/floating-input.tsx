import React, { useState, type FC } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { IoLockOpen, IoLockClosed } from "react-icons/io5";
import "./floating-input.css";

interface FloatingInputProps {
    label: string;
    id: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const FloatingInput: FC<FloatingInputProps> = ({
    label,
    id,
    type = "text",
    value,
    onChange,
    error,
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const shouldFloat = focused || value;
    const isPassword = type === "password";
    const inputType = isPassword && !showPassword ? "password" : "text";

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => setFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => setFocused(false);

    return (
        <div className="floating-input-wrapper">
            <label htmlFor={id} className={`floating-label ${shouldFloat ? "float" : ""}`}>
                {label}
            </label>

            <div className="input-field-container">
                <input
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`floating-input ${error ? "input-error" : ""}`}
                    autoComplete="off"
                />

                {isPassword && (
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <IoLockOpen className="lock-icon" />
                        ) : (
                            <IoLockClosed className="lock-icon" />
                        )}
                    </span>
                )}
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
