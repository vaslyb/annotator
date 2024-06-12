import React, { useRef, useEffect, useState } from 'react';
import './Annotation.css';

const Annotation = () => {
  const circleRef = useRef(null);
  const dotRef = useRef(null);
  const [isTracking, setIsTracking] = useState(false);

  const updateCoordinates = () => {
    const circle = circleRef.current;
    if (circle) {
      console.log(`Remain stable`);
    }
  };

  const handleMove = (event) => {
    const moveX = event.clientX || (event.touches && event.touches[0].clientX);
    const moveY = event.clientY || (event.touches && event.touches[0].clientY);
  
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (circle && dot) {
      const rect = circle.getBoundingClientRect();
      const relativeX = moveX - rect.left;
      const relativeY = moveY - rect.top;
  
      // Check if the mouse/touch event occurred within the circle
      const distanceFromCenter = Math.sqrt(
        Math.pow(relativeX - rect.width / 2, 2) + Math.pow(relativeY - rect.height / 2, 2)
      );
      const isInsideCircle = distanceFromCenter <= rect.width / 2;
  
      if (isInsideCircle) {
        // Update dot position only if inside the circle
        dot.style.left = `${moveX}px`;
        dot.style.top = `${moveY}px`;
      }
      console.log(`Relative X: ${relativeX}, Relative Y: ${relativeY}`);
  
    }
  };
  

  const handleMouseDown = (event) => {
    setIsTracking(true);
    handleMove(event); // Register initial click coordinates
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (event) => {
    setIsTracking(true);
    handleMove(event); // Register initial touch coordinates
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchEnd = () => {
    setIsTracking(false);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    let intervalId;
    if (isTracking) {
      intervalId = setInterval(updateCoordinates, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTracking]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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
    </div>
  );
};

export default Annotation;