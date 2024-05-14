import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './AuthForm.css'; 

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/users/login", {
                email,
                password,
            });

            if (response && response.data) {
                console.log(response.data);
                setLoggedIn(true);
            } else {
                console.error("Login failed: Response data is undefined");
            }
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
            setError("Login failed: " + (error.response?.data.message || error.message));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/users/register", {
                email,
                password,
            });

            console.log(response.data); 
            setRegistrationSuccess(true); 
            setError(""); 
            setTimeout(() => setRegistrationSuccess(false), 3000); 
        } catch (error) {
            console.error("Registration failed", error.response?.data.message);
            setError("Registration failed: " + (error.response?.data.message || error.message));
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("http://localhost:3001/api/users/update-password", {
                email,
                newPassword,
                forgotPassword: true,
            });

            console.log(response.data);
            setShowResetForm(false); 
            setError(""); 

        } catch (error) {
            console.error("Password reset failed", error.response?.data || error.message);
            setError("Password reset failed: " + (error.response?.data.message || error.message));
        }
    };

    useEffect(() => {
        return () => {
            setLoggedIn(false);
            setShowResetForm(false);
            setRegistrationSuccess(false);
            setError("");
        };
    }, []);

    if (registrationSuccess) {
        return (
            <div className="auth-form-container">
                <div className="auth-form-success-message">
                    Registration successful! Please login.
                </div>
            </div>
        );
    }

    if (loggedIn) {
        return null;
    }

    return (
        <div className="auth-form-container">
            <Form className="auth-form">
                <div className="auth-form-title">
                    {loggedIn ? "Logged In!" : "Login or Register!"}
                </div>
                {error && <div className="auth-form-error-message">{error}</div>}
                {!loggedIn ? (
                    <>
                        <Form.Group controlId="formBasicEmail" className="auth-form-group">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="auth-form-group">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {showResetForm && (
                            <Form.Group controlId="formNewPassword" className="auth-form-group">
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <Button
                            variant="primary"
                            type="submit"
                            className="auth-form-button"
                            onClick={showResetForm ? handleForgotPassword : handleLogin}
                        >
                            {showResetForm ? "Reset Password" : "Login"}
                        </Button>

                        <Button
                            variant="secondary"
                            type="submit"
                            className="auth-form-button"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>

                        {!showResetForm && (
                            <div
                                className="auth-form-link"
                                onClick={() => setShowResetForm(true)}
                            >
                                Forgot password?
                            </div>
                        )}
                    </>
                ) : null}
            </Form>
        </div>
    );
};

export default AuthForm;
