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
  
  // Sample recordings data divided into phases and tasks
  const [recordings] = useState([
    { id: 1, name: 'PH0_T0' }, // Phase 0 Task 0
    { id: 2, name: 'PH0_T1' }, // Phase 0 Task 1
    { id: 3, name: 'PH1_T0' }, // Phase 1 Task 0
    { id: 4, name: 'PH1_T1' }, // Phase 1 Task 1
    { id: 5, name: 'PH1_T2' }, // Phase 1 Task 2
    { id: 6, name: 'PH1_T3' }, // Phase 1 Task 3
    { id: 7, name: 'PH1_T4' }, // Phase 1 Task 4
    { id: 8, name: 'PH2_T0' }, // Phase 2 Task 0
    { id: 9, name: 'PH2_T1' }, // Phase 2 Task 1
    { id: 10, name: 'PH2_T2' }, // Phase 2 Task 2
    { id: 11, name: 'PH3_T0' }, // Phase 3 Task 0
    { id: 12, name: 'PH3_T1' }, // Phase 3 Task 1
  ]);

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
