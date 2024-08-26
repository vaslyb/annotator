import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginBackground from '../figs/annotation.jpg';
import SignUp from './SignUp';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:w7sbvKhS/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(email, data.authToken);
        navigate('/list'); // Navigate to the list page on successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className="login-card">
        <h1>Are you ready to annotate?</h1>
        {error && <p className="error-message">{error}</p>}
        {isSignUp ? (
          <SignUp onSignUp={() => setIsSignUp(false)} />
        ) : (
          <>
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
              <button type="submit" className="login-button">Login</button>
            </form>
            <p>Don't have an account? <button onClick={handleSignUpClick} className="signup-link">Sign Up</button></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
