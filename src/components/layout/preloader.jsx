import React, { useState, useEffect } from 'react';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(onFinish, 800); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1; 
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  // Calculate the vertical position for the text to follow the bar
  // The bar starts at 15% from bottom and ends at 15% from top.
  // So the total active area is 70% of the screen height.
  const textBottomPosition = 15 + (progress * 0.7); 

  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#121212',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center', // This centers contents horizontally if needed
        justifyContent: 'flex-start', // Align to left
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'all',
        transition: 'opacity 0.8s ease-in-out'
    }}>
      
      {/* 1. The Track (Background Line) - Fixed Margins */}
      <div style={{
          position: 'absolute',
          left: '40px',
          top: '15%',    /* Margin from Top */
          bottom: '15%', /* Margin from Bottom */
          width: '2px',
          backgroundColor: '#333'
      }}>
        {/* 2. The Progress Fill (Red Line) */}
        <div style={{
            width: '100%',
            height: `${progress}%`,
            backgroundColor: 'var(--accent)', 
            position: 'absolute',
            bottom: 0,
            transition: 'height 0.1s linear'
        }} />
      </div>

      {/* 3. Percentage Text & Icon - Moves with the bar! */}
      <div style={{
          position: 'absolute',
          left: '55px', 
          bottom: `${textBottomPosition}%`, /* Follows the progress */
          transform: 'translateY(50%)', /* Center text vertically relative to the tip */
          color: 'white',
          fontSize: '20px', /* Smaller size */
          fontFamily: 'Arial, Helvetica, sans-serif', /* Standard clean font */
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'bottom 0.1s linear'
      }}>
        {Math.min(progress, 100)}
        
        {/* Static Black & White Checkered Flag */}
        <div style={{ 
            width: '14px', 
            height: '14px', 
            // Simple CSS Checkered pattern (Black & White)
            backgroundImage: `
              linear-gradient(45deg, #fff 25%, transparent 25%), 
              linear-gradient(-45deg, #fff 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #fff 75%), 
              linear-gradient(-45deg, transparent 75%, #fff 75%)
            `,
            backgroundColor: 'black', // The "Black" squares
            backgroundSize: '7px 7px', // Size of checks
            backgroundPosition: '0 0, 0 3.5px, 3.5px -3.5px, -3.5px 0px'
        }} />
      </div>

    </div>
  );
};

export default Preloader;