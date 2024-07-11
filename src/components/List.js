// src/components/List.js
import React from 'react';
import './List.css';

const List = ({ recordings, onSelectRecording }) => {
  return (
    <div className="list-container">
      {recordings.map((recording, index) => (
        <button
          key={index}
          className="list-button"
          onClick={() => onSelectRecording(recording.id)}
        >
          Recording {recording.id}
        </button>
      ))}
    </div>
  );
};

export default List;

