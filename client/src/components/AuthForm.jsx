// client/src/components/AuthForm.jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './AuthForm.css'; // Import the styles

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/users/login", {
                email,
                password,
            });

            console.log(response); // Log the entire response for debugging

            // Check if 'data' property exists before accessing it
            if (response && response.data) {
                console.log(response.data); // Handle successful login response
            } else {
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

    return (
        <div className="auth-form-container">
            <Form className="auth-form">
                <div className="auth-form-title">Login or Register!</div>
                <Form.Group controlId="formBasicEmail" className="auth-form-group">
                    <Form.Control 
                    type="email" placeholder="Enter email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
            
                <Form.Group controlId="formBasicPassword" className="auth-form-group">
                    <Form.Control type="password" placeholder="Password "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="auth-form-button" onClick={handleLogin}>
                Login
                </Button>
                <Button variant="secondary" type="sumit" className="auth-form-button" onClick={handleRegister}>
                Register
                </Button>

                <div className="auth-form-link">Forgot password?</div>
            </Form>
        </div>
    );
};

export default AuthForm;