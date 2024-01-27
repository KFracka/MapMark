// client/src/components/AuthForm.jsx
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './AuthForm.css'; // Import the styles

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);

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
            }else {
                console.error("Login failed: Reponse data is undefined");
            }
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/users/register", {
                email,
                password,
            });

            console.log(response.data); // Handle successful registration response
        } catch (error) {
            console.error("Registration failed", error.response.data.message);
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

            console.log(response.data); // Handle successful password reset response
            //setLoggedIn(true);
            setShowResetForm(false); // Hide the reset password form

        } catch (error) {
            console.error("Password reset failed", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        // Clear the login status and show primary form when component unmounts
        return () => {
            setLoggedIn(false);
            setShowResetForm(false);
        };
    }, []);

    if (loggedIn) {
        return null;
    }

    return (
        <div className="auth-form-container">
            <Form className="auth-form">
                <div   
                    className="auth-form-title">
                    {loggedIn ? "Logged In!" : "Login or Register!"}
                </div>
                {!loggedIn ? (
                    <>
                        <Form.Group 
                        controlId="formBasicEmail" className="auth-form-group">
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
            
                    <Form.Group controlId="formBasicPassword" className="auth-form-group">
                        <Form.Control 
                            type="password"                               
                            placeholder="Password "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {showResetForm ? (
                        <Form.Group controlId="formNewPassword" className="auth-form-group">
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                
                            />
                        </Form.Group>
                    ) : null}

                <Button
                    variant="primary"
                    type="submit"
                    className="auth-form-button"
                    onClick={showResetForm ? handleForgotPassword : handleLogin}
                >
                    {showResetForm ? "Reset Password " : "Login"}
                </Button>

                <Button
                    variant="secondary"
                    type="submit"
                    className="auth-form-button"
                    onClick={handleRegister}
                >
                    Register
                </Button>

                {!showResetForm ? (
                    <div
                        className="auth-form-link"
                        onClick={() =>  setShowResetForm(true)}
                        
                        >
                            Forgot password?
                        </div>
                    ) : null}
                </>
            ) : null}
        </Form>
    </div>
    );
};

export default AuthForm;