import React, { useEffect } from 'react';
import '../styles/logout.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ToastNotification from '../../components/toast/toast';
import { handleApiError } from '../../utils/handleApiError';
import { LogoutUser } from '../../api/auth.api';

const Logout: React.FC = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const reason = searchParams.get("reason");
    
    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = async() => {
        try {
            const logoutResponse = await LogoutUser();

            if( logoutResponse.success ) {
                localStorage.removeItem('user');
                navigate(`/login?reason=${reason}`, { replace: true });
            }
        } catch (error) {
            handleApiError(error, "Logout failed! Please try again");
        }
    }

    return (
        <div className="logout-screen">
            <ToastNotification/>
            <div className="logout-box">
                <div className="spinner" />
                <p className="logout-message">{t('logout-message') }</p>
            </div>
        </div>
    );
};

export default Logout;
