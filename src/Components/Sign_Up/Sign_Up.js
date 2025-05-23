import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const register = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const json = await response.json();

            if (!response.ok) {
                if (json.error) {
                    // Handle single error message (like duplicate email)
                    setErrors([json.error]);
                } else if (json.errors) {
                    // Handle validation errors from express-validator
                    const validationErrors = json.errors.map(err => `${err.param}: ${err.msg}`);
                    setErrors(validationErrors);
                } else {
                    setErrors(['Registration failed. Please try again.']);
                }
                return;
            }

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", formData.name);
                sessionStorage.setItem("phone", formData.phone);
                sessionStorage.setItem("email", formData.email);

                // Redirect to home page
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors(['Network error. Please check your connection.']);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <h2 className="text-center mb-4">Create an Account</h2>
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            <ul className="mb-0">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your full name"
                                required
                                minLength="4"
                            />
                            <small className="form-text text-muted">At least 4 characters</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your 10-digit phone number"
                                required
                                minLength="10"
                                maxLength="10"
                                pattern="[0-9]{10}"
                            />
                            <small className="form-text text-muted">10 digits required</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Create a password"
                                required
                                minLength="8"
                            />
                            <small className="form-text text-muted">At least 8 characters</small>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Sign Up'}
                        </button>
                        <div className="text-center mt-3">
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;