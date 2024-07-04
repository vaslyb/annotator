import React, { useRef, useEffect, useState } from 'react';
import './Annotation.css';
import EmotionModal from './EmotionModal';  // Import the EmotionModal component

const Annotation = ({ userId, sessionId, token }) => {
  const circleRef = useRef(null);
  const dotRef = useRef(null);
  const [isTracking, setIsTracking] = useState(false);
  const [annotationInterval, setAnnotationInterval] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const saveAnnotation = (relativeX, relativeY) => {
    const annotationTime = new Date().toISOString();
    console.log('Saving annotation:', relativeX, relativeY, annotationTime);
    const newAnnotation = {
      arousal: Math.round(relativeX),
      valence: Math.round(relativeY),
      user_id: userId,
      session_id: sessionId,
      annotation_time: annotationTime,
    };
    setAnnotations(prevAnnotations => [...prevAnnotations, newAnnotation]);
  };

  const updateCoordinates = () => {
    const circle = circleRef.current;
    const dot = dotRef.current;

    if (circle && dot) {
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dotRect = dot.getBoundingClientRect();
      const moveX = dotRect.left + dotRect.width / 2;
      const moveY = dotRect.top + dotRect.height / 2;

      const relativeX = moveX - centerX;
      const relativeY = moveY - centerY;

      saveAnnotation(relativeX, -relativeY);
    }
  };

  const handleMove = (event) => {
    const moveX = event.clientX || (event.touches && event.touches[0].clientX);
    const moveY = event.clientY || (event.touches && event.touches[0].clientY);

    const circle = circleRef.current;
    const dot = dotRef.current;
    if (circle && dot) {
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relativeX = moveX - centerX;
      const relativeY = moveY - centerY;

      const distanceFromCenter = Math.sqrt(
        Math.pow(relativeX, 2) + Math.pow(relativeY, 2)
      );
      const isInsideCircle = distanceFromCenter <= rect.width / 2;

      if (isInsideCircle) {
        dot.style.left = `${moveX}px`;
        dot.style.top = `${moveY}px`;
      }
    }
  };

  const handleMouseDown = (event) => {
    setIsTracking(true);
    handleMove(event);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);

    if (!annotationInterval) {
      const intervalId = setInterval(updateCoordinates, 1000);
      setAnnotationInterval(intervalId);
    }
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if (annotationInterval) {
      clearInterval(annotationInterval);
      setAnnotationInterval(null);
    }
  };

  const handleTouchStart = (event) => {
    setIsTracking(true);
    handleMove(event);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleTouchEnd);

    if (!annotationInterval) {
      const intervalId = setInterval(updateCoordinates, 1000);
      setAnnotationInterval(intervalId);
    }
  };

  const handleTouchEnd = () => {
    setIsTracking(false);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleTouchEnd);

    if (annotationInterval) {
      clearInterval(annotationInterval);
      setAnnotationInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (annotationInterval) {
        clearInterval(annotationInterval);
      }
    };
  }, [annotationInterval]);

  const downloadAnnotations = () => {
    setIsModalOpen(true);
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);

    // Save annotations to JSON file with selected emotion
    const annotationsWithEmotion = {
      emotion: emotion,
      annotations: annotations
    };
    const blob = new Blob([JSON.stringify(annotationsWithEmotion, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotations.json';
    a.click();
    URL.revokeObjectURL(url);

    // Clear annotations after saving
    setAnnotations([]);
    setSelectedEmotion('');
  };

  const handleRedo = () => {
    // Clear annotations and reset the dot's position
    setAnnotations([]);
    setIsTracking(false);
    if (annotationInterval) {
      clearInterval(annotationInterval);
      setAnnotationInterval(null);
    }

    // Reset dot position
    if (dotRef.current) {
      dotRef.current.style.left = '0px';
      dotRef.current.style.top = '0px';
    }
  };

  return (
    <div className={`circle-container ${isTracking ? 'tracking' : ''}`}>
      <div
        ref={circleRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="circle"
        title="Annotation Circle"
      >
      </div>
      <div ref={dotRef} className="dot"></div>
      <button onClick={handleRedo} className="redo-button">Start Over</button>
      <button onClick={downloadAnnotations} className="download-button">Finish and Download</button>
      <EmotionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleEmotionSelect} 
      />
    </div>
  );
};

export default Annotation;
