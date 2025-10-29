// UPDATE AccountCreation with this code to add a login option.

import React, { useState } from 'react';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';

function AccountCreation({ onAccountCreated, existingAccounts }) {
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup') {
      // Signup validation
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (!validateUsername(formData.username)) {
        newErrors.username = 'Username must be 3-20 characters, alphanumeric and underscore only';
      } else if (existingAccounts.some(acc => acc.username === formData.username)) {
        newErrors.username = 'Username already exists';
      }

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // Login validation
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      if (mode === 'login') {
        // Handle login
        const account = existingAccounts.find(
          acc => acc.username === formData.username && acc.password === formData.password
        );
        
        if (account) {
          onAccountCreated({
            username: account.username,
            email: account.email,
            isLogin: true
          });
        } else {
          setErrors({ password: 'Invalid username or password' });
        }
      } else {
        // Handle signup
        onAccountCreated({
          username: formData.username,
          email: formData.email,
          password: formData.password, // Store password for demo (never do this in production!)
          createdAt: new Date().toISOString()
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signup' ? 'login' : 'signup');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af' }}>
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>
            {mode === 'signup' 
              ? 'Start your voyage with Ship Keep Co' 
              : 'Log in to continue booking'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '8px',
              color: '#374151'
            }}>
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="johndoe123"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.username ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {errors.username && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.username}
              </p>
            )}
          </div>

          {/* Email Field - Only for Signup */}
          {mode === 'signup' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.email ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.email}
                </p>
              )}
            </div>
          )}

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '8px',
              color: '#374151'
            }}>
              Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.password ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {errors.password && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field - Only for Signup */}
          {mode === 'signup' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Confirm password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.confirmPassword ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              {errors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Show Password Toggle */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor="showPassword" style={{ fontSize: '14px', color: '#6b7280' }}>
              Show password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#1e40af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e3a8a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1e40af'}
          >
            {mode === 'signup' ? 'Create Account' : 'Log In'}
          </button>

          {/* Switch Mode Link */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={switchMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#1e40af',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {mode === 'signup' 
                ? 'Already have an account? Log in' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        {/* Security Notice - Only show for signup */}
        {mode === 'signup' && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#dbeafe',
            borderRadius: '8px',
            border: '1px solid #93c5fd'
          }}>
            <p style={{ fontSize: '12px', color: '#1e40af', lineHeight: '1.5', margin: 0 }}>
              <strong>Security Features Implemented:</strong><br/>
              1. Password strength validation (8+ chars, uppercase, lowercase, number)<br/>
              2. Email format verification<br/>
              3. Username sanitization (alphanumeric only)<br/>
              4. Autocomplete attributes for browser security
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountCreation;