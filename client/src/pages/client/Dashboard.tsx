import './../styles/dahsboard.css';
import LANDING_LOGO from './../../assets/images/logo/landing_logo.png';
import MAIN_LOGO from './../../assets/images/logo//Taskify_Web_Logo.png';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Dashboard = () => {
    useDocumentTitle("Dashboard");

    return (
        <div className="dashboard-container">
            <div className="banner-container">
                <div className="banner-left">
                    <img src={MAIN_LOGO} alt="Main Logo" className="brand-logo" />
                    <div className="headline">
                        <p className="brand-slogan main-headline">Your All-in-One Task Management Platform for Teams</p>
                        <p className="brand-slogan">Assign tasks, collaborate, and get work done — from startups to enterprises.</p>
                    </div>
                    <div className="cta-button">
                        <p>Get Started</p>
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