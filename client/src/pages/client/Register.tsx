import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import './../styles/login.css';
import LANDING_LOGO from './../../assets/images/logo/landing_logo.png';
import { FloatingInput } from "../../components/inputs/floating-input";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    useDocumentTitle("Register");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string, password?: string }>({});

    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors: typeof errors = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required.';
        } else if (username.length < 6) {
            newErrors.username = 'Username must be at least 6 characters.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        }

        else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) {

        }
    }

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <div className="login-form-left">
                    <h2 className="login-title">Create Your Account</h2>
                    <p className="login-subtitle">Join Taskify and start organizing your team's work effortlessly.</p>
                    <form className="login-input-form" onSubmit={(e) => handleSubmit(e)}>
                        <FloatingInput
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
                        <FloatingInput
                            id="email"
                            label="Email"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
                        <FloatingInput
                            id="phone"
                            label="Phone"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
                        <FloatingInput
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />

                        <FloatingInput
                            id="confirm-password"
                            label="Confirm Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                        <button type="submit" className="login-submit-button">
                            <p>Register</p>
                            <div className="login-arrow-icon">
                                <FaArrowRightLong />
                            </div>
                        </button>
                    </form>
                    <div className="switch-link">
                        <p>Don't have account?
                            <label
                                onClick={() => navigate('/register')}
                                className="link-title">Register</label></p>
                        <div
                            className="back-to-home-button"
                            onClick={() => navigate('/')}>
                            <p className="back-to-home-button-title">Back to Home</p>
                        </div>
                    </div>
                </div>
                <div className="login-form-right">
                    <img src={LANDING_LOGO} alt="Task Logo" className="auth-landing-logo" />
                </div>
            </div>
        </div>
    )
}