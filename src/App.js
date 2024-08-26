// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Annotation from './components/Annotation';
import SignUp from './components/SignUp';
import List from './components/List';

function App() {
  const [token, setToken] = useState('');
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
  };

  const handleSignUp = () => {
    // Handle sign-up logic here if needed
  };

  const handleSelectRecording = (id) => {
    setSelectedRecordingId(id);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} onSignUp={handleSignUp} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
            <Route 
              path="/list" 
              element={
                <List 
                  recordings={recordings} 
                  onSelectRecording={handleSelectRecording} 
                />
              } 
            />
            <Route 
              path="/annotation" 
              element={
                <Annotation 
                  token={token} 
                  userId={email} 
                  recordingId={selectedRecordingId} 
                />
              } 
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
