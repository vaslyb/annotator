import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!emailIsValid(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Assuming sign-up is successful
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:w7sbvKhS/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      if (!response.ok) {
        // Handle non-success responses here
        const errorData = await response.json();
        setError(errorData.message || 'Failed to sign up');
        return;
      }
  
      onSignUp();
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up');
    }
  };

  const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const goBackToLogin = () => {
    // Implement the logic to go back to the login page
    // For example, you can use window.location.href to redirect
    window.location.href = '/login';
  };
  
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <button onClick={goBackToLogin} className="back-to-login-button">Back to Login</button> {/* Button to go back to login */}
    </div>
  );
};

export default SignUp;
