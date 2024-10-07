import React, { useState } from 'react';
import './EmotionModal.css';

const emotionStyles = {
  happiness: { backgroundColor: '#FFFF00', color: '#000000' },  // Yellow
  sadness: { backgroundColor: '#1E90FF', color: '#FFFFFF' },    // Dodger Blue
  fear: { backgroundColor: '#000000', color: '#FFFFFF' },       // Black
  disgust: { backgroundColor: '#008000', color: '#FFFFFF' },    // Green
  anger: { backgroundColor: '#FF0000', color: '#FFFFFF' },      // Red
  surprise: { backgroundColor: '#FFA500', color: '#000000' },   // Orange
  neutral: { backgroundColor: '#808080', color: '#FFFFFF' }     // Grey
};

const selectedEmotionStyles = {
  happiness: { 
    backgroundColor: '#FFFF00', 
    color: '#000000', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(255, 215, 0, 0.8)'  // Gold with shadow
  },  
  sadness: { 
    backgroundColor: '#1E90FF', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(30, 144, 255, 0.8)'  // Dodger Blue with shadow
  },  
  fear: { 
    backgroundColor: '#000000', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(255, 69, 0, 0.8)'  // Orange Red with shadow
  },  
  disgust: { 
    backgroundColor: '#008000', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(50, 205, 50, 0.8)'  // Lime Green with shadow
  },  
  anger: { 
    backgroundColor: '#FF0000', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(220, 20, 60, 0.8)'  // Crimson with shadow
  },  
  surprise: { 
    backgroundColor: '#FFA500', 
    color: '#000000', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(255, 105, 180, 0.8)'  // Hot Pink with shadow
  },  
  neutral: { 
    backgroundColor: '#808080', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    boxShadow: '0px 4px 10px rgba(169, 169, 169, 0.8)'  // Dark Grey with shadow
  }  
};



const EmotionModal = ({ isOpen, onClose, onConfirm }) => {
  const [liked, setLiked] = useState(3);  // Default value for "How much did you like it?" question
  const [familiar, setFamiliar] = useState(3);  // Default value for "How familiar are you with the music track?" question
  const [selectedEmotion, setSelectedEmotion] = useState(null);  // Selected emotion state
  const [lockedEmotion, setLockedEmotion] = useState(null); // State to track locked emotion

  const handleEmotionSelect = (emotion) => {
    if (lockedEmotion === emotion) {
      // If clicking the same emotion, unlock it
      setLockedEmotion(null);
      setSelectedEmotion(null);
    } else {
      // Otherwise, lock the new selected emotion
      setLockedEmotion(emotion);
      setSelectedEmotion(emotion);
    }
  };

  const handleConfirm = () => {
    if (selectedEmotion) {
      onConfirm({ emotion: selectedEmotion, liked, familiar });
      onClose();
    } else {
      alert('Please select an emotion!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select an Emotion</h2>
        <div className="emotion-options">
          {Object.keys(emotionStyles).map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleEmotionSelect(emotion)}
              className={`emotion-button ${lockedEmotion === emotion ? 'locked' : ''}`}
              style={lockedEmotion === emotion ? selectedEmotionStyles[emotion] : emotionStyles[emotion]}  // Apply dark styles if selected
              disabled={lockedEmotion && lockedEmotion !== emotion} // Disable all other buttons if one is selected
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </button>
          ))}
        </div>

        <div className="question-section">
          <h3>How much did you like the music track?</h3>
          <input
            type="range"
            min="1"
            max="5"
            value={liked}
            onChange={(e) => setLiked(e.target.value)}
          />
          <div className="scale-labels">
            <span>Not at all (1)</span>
            <span>Very much (5)</span>
          </div>
          <p>{liked}</p>

          <h3>How familiar are you with the music track?</h3>
          <input
            type="range"
            min="1"
            max="5"
            value={familiar}
            onChange={(e) => setFamiliar(e.target.value)}
          />
          <div className="scale-labels">
            <span>Not at all (1)</span>
            <span>Very much (5)</span>
          </div>
          <p>{familiar}</p>
        </div>

        <button className="confirm-button" onClick={handleConfirm}>
          Download
        </button>
      </div>
    </div>
  );
};

export default EmotionModal;
