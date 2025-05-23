import React, { useState } from 'react';
import './Sign_Up.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert('Sign Up Successful!');
      // Submit logic here
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <a href="../Login/Login.html" style={{ color: '#2190FF' }}>Login</a>
        </div>

        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" className="form-control" onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input name="phone" className="form-control" onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" className="form-control" onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" className="form-control" onChange={handleChange} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-danger">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
