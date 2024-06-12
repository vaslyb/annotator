import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Annotation from './components/Annotation';
import SignUp from './components/SignUp'; // Import the SignUp component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State to manage sign-up option

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? <Annotation /> : (isSignUp ? <SignUp /> : <Login onLogin={handleLogin} onSignUp={handleSignUp} />)}
        {/* 
          If isLoggedIn is true, render Annotation
          If isSignUp is true, render SignUp
          Otherwise, render Login with handleSignUp prop
        */}
      </header>
    </div>
  );
}

export default App;