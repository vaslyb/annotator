// src/components/List.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';

const List = ({ recordings, onSelectRecording }) => {
  const navigate = useNavigate();

  const handleSelectRecording = (id) => {
    onSelectRecording(id); // Update the selected recording in the parent component
    navigate('/annotation'); // Navigate to the annotation page
  };

  return (
    <div className="list-container">
      {recordings.map((recording) => (
        <button
          key={recording.id}
          className="list-button"
          onClick={() => handleSelectRecording(recording.id)}
        >
          Recording {recording.id}
        </button>
      ))}
    </div>
  );
};

export default List;
