// src/App.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Annotation from './components/Annotation';
import SignUp from './components/SignUp';
import List from './components/List'; // Import the List component

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedRecordingId, setSelectedRecordingId] = useState(null); // State to manage selected recording ID
  const [recordings] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ]); // Sample recordings data

  const handleLogin = (email, authToken) => {
    setToken(authToken);
    setEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSelectRecording = (id) => {
    setSelectedRecordingId(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          selectedRecordingId !== null ? (
            <Annotation token={token} userId={email} recordingId={selectedRecordingId} />
          ) : (
            <List recordings={recordings} onSelectRecording={handleSelectRecording} />
          )
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
