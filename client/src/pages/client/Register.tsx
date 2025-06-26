import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import './../styles/login.css';
import LANDING_LOGO from './../../assets/images/logo/landing_logo.png';
import { FloatingInput } from "../../components/inputs/floating-input";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loading } from "../../components/loader/loader";
import { IoHome } from "react-icons/io5";
import ToastNotification, { showTopToast } from "../../components/toast/toast";
import { RegisterUser } from "../../api/auth.api";
import { handleApiError } from "../../utils/handleApiError";

export const Register = () => {
    const { t } = useTranslation("auth");
    useDocumentTitle(t('register-title'));
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
        email?: string,
        phone?: string,
        username?: string,
        password?: string,
        confirmPassword?: string
    }>({});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors: typeof errors = {};
    
        if (!username.trim()) {
            newErrors.username = t('auth-error.register.username-required');
        } else if (username.length < 6) {
            newErrors.username = t('auth-error.register.username-atleast');
        }
    
        if (!email.trim()) {
            newErrors.email = t('auth-error.register.email-required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('auth-error.register.email-invalid');
        }
    
        if (!phone.trim()) {
            newErrors.phone = t('auth-error.register.phone-required');
        } else if (!/^\d{9,15}$/.test(phone)) {
            newErrors.phone = t('auth-error.register.phone-invalid');
        }
    
        if (!password) {
            newErrors.password = t('auth-error.register.password-required');
        } else if (password.length < 6) {
            newErrors.password = t('auth-error.register.password-atleast');
        }
    
        if (!confirmPassword) {
            newErrors.confirmPassword = t('auth-error.register.confirm-password-required');
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('auth-error.register.password-match');
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const registerResponse = await RegisterUser({
                username,
                email,
                phone,
                password,
                confirmPassword
            });

            if (registerResponse.success) {
                showTopToast(registerResponse.message ?? "Registration successful!", "success", 5000);
                navigate('/login?reg=true');
            }
        } catch (err) {
            handleApiError(err, "Unexpected error occurred during registration");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <ToastNotification />
                <div className="login-form-left">
                <div className="switch-link-top">
                        <button
                            className="back-to-home-button"
                            onClick={() => navigate('/')}>
                            <IoHome className="back-to-home-button-icon"/>
                        </button>
                    </div>
                    <h2 className="login-title">{t('register-main-title')}</h2>
                    <p className="login-subtitle">{t('register-sub-title')}</p>
                    <form className="login-input-form" onSubmit={(e) => handleSubmit(e)}>
                        <FloatingInput
                            id="username"
                            label={t('username')}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
                        <FloatingInput
                            id="email"
                            label={t('email')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <FloatingInput
                            id="phone"
                            label={t('phone')}
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={errors.phone}
                        />
                        <FloatingInput
                            id="password"
                            label={t('password')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />

                        <FloatingInput
                            id="confirm-password"
                            label={t('confirm-password')}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                        />
                        <button type="submit" className="login-submit-button">
                            {loading ? <Loading
                                loading={loading}
                                size={20}
                                color="#fff"
                            /> :
                                <>
                                    <p className="login-submit-button-text">{t('register-button')}</p>
                                    <div className="login-arrow-icon">
                                        <FaArrowRightLong />
                                    </div>
                                </>}
                        </button>
                    </form>
                    <div className="switch-link">
                        <p>{t('already-have-account')}
                            <label
                                onClick={() => navigate('/login')}
                                className="link-title">{t('login-button')}</label></p>
                    </div>
                </div>
                <div className="login-form-right">
                    <img src={LANDING_LOGO} alt="Task Logo" className="auth-landing-logo" />
                </div>
            </div>
        </div>
    )
}