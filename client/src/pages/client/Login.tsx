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
import { LoginUser } from './../../api/auth.api';
import { useAuth } from "../../context/AuthContext";
import { handleApiError } from "../../utils/handleApiError";
import { useSearchParams } from "react-router-dom";



export const Login = () => {
    const { t } = useTranslation("auth");
    useDocumentTitle(t('login-title'));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string, password?: string }>({});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    const reg = searchParams.get("reg");

    useEffect(() => {
        if (reg) {
            showTopToast(t('register-success'), "success", 5000);
        }
    }, [reg, t]);

    const validateInputs = () => {
        const newErrors: typeof errors = {};
        if (!username.trim()) {
            newErrors.username = t('auth-error.login.username-required');
        } else if (username.length < 6) {
            newErrors.username = t('auth-error.login.username-atleast');
        }

        if (!password) {
            newErrors.password = t('auth-error.login.password-required');
        }

        else if (password.length < 6) {
            newErrors.password = t('auth-error.login.password-atleast');
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            setLoading(true);

            const loginResponse = await LoginUser({ username, password });

            if (loginResponse.success) {
                login(loginResponse.data?.user ?? null);
                navigate('/manage-dashboard');
            }
        } catch (err) {
            handleApiError(err, "Unexpected error occurred during login");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <ToastNotification />
            <div className="form-wrapper">
                <div className="login-form-left">
                    <div className="switch-link-top">
                        <button
                            className="back-to-home-button"
                            onClick={() => navigate('/')}>
                            <IoHome className="back-to-home-button-icon" />
                            {/* <p className="back-to-home-button-title">{t('back-to-home-button')}</p> */}
                        </button>
                    </div>
                    <h2 className="login-title">{t('login-main-title')}</h2>
                    <p className="login-subtitle">{t('login-sub-title')}</p>
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
                            id="password"
                            label={t('password')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                        <div className="forgot-password-button">
                            <p>{t('forgot-password-button')}</p>
                        </div>
                        <button type="submit" className="login-submit-button">
                            {loading ? <Loading
                                loading={loading}
                                size={20}
                                color="#fff"
                            /> :
                                <>
                                    <p className="login-submit-button-text">{t('login-button')}</p>
                                    <div className="login-arrow-icon">
                                        <FaArrowRightLong />
                                    </div>
                                </>}
                        </button>
                    </form>
                    <div className="switch-link">
                        <p>{t('dont-have-account')}
                            <label
                                onClick={() => navigate('/register')}
                                className="link-title">{t('register-button')}</label></p>
                    </div>
                </div>
                <div className="login-form-right">
                    <img src={LANDING_LOGO} alt="Task Logo" className="auth-landing-logo" />
                </div>
            </div>
        </div>
    )
}