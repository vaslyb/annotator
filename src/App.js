import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Annotation from './components/Annotation';
import SignUp from './components/SignUp'; // Import the SignUp component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(''); // Add state to manage the token
  const [isSignUp, setIsSignUp] = useState(false); // State to manage sign-up option
  const [email, setEmail] = useState('');
  const handleLogin = (email,authToken) => {
    setToken(authToken); // Save the token
    setEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <Annotation token={token} userId={email} /> // Pass the token as a prop
        ) : isSignUp ? (
          <SignUp onSignUp={handleLogin} />
        ) : (
          <Login onLogin={handleLogin} onSignUp={handleSignUp} />
        )}
      </header>
    </div>
  );
}

export default App;
