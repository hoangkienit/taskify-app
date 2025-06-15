import './../styles/dashboard.css';
import LANDING_LOGO from './../../assets/images/logo/landing_logo.png';
import MAIN_LOGO from './../../assets/images/logo//Taskify_Web_Logo.png';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
    const { t } = useTranslation("dashboard");
    useDocumentTitle(t('title'));

    return (
        <div className="dashboard-container">
            <div className="banner-container">
                <div className="banner-left">
                    <img src={MAIN_LOGO} alt="Main Logo" className="brand-logo" />
                    <div className="headline">
                        <p className="brand-slogan main-headline">{t('main-headline') }</p>
                        <p className="brand-slogan">{ t('sub-headline')}</p>
                    </div>
                    <div className="cta-button">
                        <span className="icon-wrapper">
                        <BsRocketTakeoffFill />
                        </span>
                        <p className='cta-button-text'>{t('cta-button-text') }</p>
                    </div>
                </div>
                <div className="banner-right">
                    <img src={LANDING_LOGO} alt="Task Logo" className="landing-logo" />
                </div>
            </div>
            <div className="overview-container">
                vddsfsdf
            </div>
        </div>
    )
}