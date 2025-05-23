import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.errors) {
          // Handle validation errors
          const validationErrors = json.errors.map(err => err.msg);
          setErrors(validationErrors);
        } else if (json.error) {
          // Handle single error message
          setErrors([json.error]);
        } else {
          setErrors(['Login failed. Please try again.']);
        }
        return;
      }

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', formData.email);
        
        // Fetch user data to store name and phone
        const userRes = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            'email': formData.email
          }
        });
        
        if (userRes.ok) {
          const userData = await userRes.json();
          sessionStorage.setItem('name', userData.name);
          sessionStorage.setItem('phone', userData.phone);
        }

        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(['Network error. Please check your connection.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="login-grid">
        <div className="login-form">
          <div className="login-header">
            <h2>Login</h2>
            <p className="login-subheader">
              Are you a new member?{' '}
              <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </p>
          </div>
          
          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul style={{ marginBottom: 0 }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={login}>
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
              <label htmlFor="password">Password</label>
              <input
                value={formData.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            
            <div className="text-center mt-3">
              <Link to="/forgot-password" style={{ color: '#2190FF' }}>
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;