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
        // Random increment to make it look "real"
        return prev + Math.floor(Math.random() * 5) + 1; 
      });
    }, 40); // Speed of loading

    return () => clearInterval(interval);
  }, [onFinish]);

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
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'all',
        transition: 'opacity 0.8s ease-in-out'
    }}>
      {/* 1. Left Vertical Progress Bar */}
      <div style={{
          position: 'absolute',
          left: '40px',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: '#333'
      }}>
        <div style={{
            width: '100%',
            height: `${progress}%`,
            backgroundColor: 'var(--accent)',
            position: 'absolute',
            bottom: 0,
            transition: 'height 0.1s linear'
        }} />
      </div>

      {/* 2. Percentage Text & Icon (Follows the image style) */}
      <div style={{
          position: 'absolute',
          left: '55px', /* Next to the bar */
          top: '40px', /* Near top like the image */
          color: 'white',
          fontSize: '48px',
          fontFamily: 'Against, sans-serif', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
      }}>
        {Math.min(progress, 100)}
        
        {/* Simple CSS Checkered Flag Icon */}
        <div style={{ 
            width: '24px', 
            height: '24px', 
            background: `
                conic-gradient(
                    white 90deg, 
                    var(--accent) 90deg 180deg, 
                    white 180deg 270deg, 
                    var(--accent) 270deg
                )`,
            borderRadius: '2px',
            transform: `rotate(${progress * 2}deg)`, // Spin effect while loading
            transition: 'transform 0.1s linear'
        }} />
      </div>

    </div>
  );
};

export default Preloader;