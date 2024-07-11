import React from 'react';
import './EmotionModal.css';

const emotionStyles = {
  happiness: { backgroundColor: '#FFFF00', color: '#000000' },  // Yellow
  sadness: { backgroundColor: '#1E90FF', color: '#FFFFFF' },  // Dodger Blue
  fear: { backgroundColor: '#000000', color: '#FFFFFF' },      // Black
  disgust: { backgroundColor: '#008000', color: '#FFFFFF' },   // Green
  anger: { backgroundColor: '#FF0000', color: '#FFFFFF' },     // Red
  surprise: { backgroundColor: '#FFA500', color: '#000000' },  // Orange
  neutral: { backgroundColor: '#808080', color: '#FFFFFF' }    // Grey
};

const EmotionModal = ({ isOpen, onClose, onConfirm }) => {
  const handleEmotionSelect = (emotion) => {
    onConfirm(emotion);  // Invoke the onConfirm callback when an emotion is selected
    onClose();  // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="emotion-options">
          {Object.keys(emotionStyles).map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleEmotionSelect(emotion)}
              className="emotion-button"
              style={emotionStyles[emotion]}
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionModal;
