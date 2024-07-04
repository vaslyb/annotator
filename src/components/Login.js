import React, { useState } from 'react';
import './Login.css';  // Ensure this path is correct
import loginBackground from '../figs/annotation.jpg'; // Adjust the path based on your folder structure
import SignUp from './SignUp'; // Import the SignUp component

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to manage sign-up option

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
        console.log(data);
        // Assume login is successful if a token is received
        onLogin(email,data.authToken); // Pass the token to the parent component
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className="login-card">
        <h2></h2> {/* Add title "Annotate" here */}
        {error && <p className="error-message">{error}</p>}
        {isSignUp ? (
          <SignUp onSignUp={handleLoginClick} />
        ) : (
          <>
            <h1>Are you ready to annotate?</h1>
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
