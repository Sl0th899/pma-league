/* =========================================
   0. IMPORTS
   ========================================= */
import React, { useState, useEffect } from 'react';

/* =========================================
   1. HELPER LOGIC
   ========================================= */
const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

/* =========================================
   2. SUB-COMPONENTS
   ========================================= */
const TimeGroup = ({ val, label }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', margin: '0 15px' }}>
    {/* The Number (Bright White) - INCREASED SIZE */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '160px', // Increased from 120px
        color: '#f0f0f0',
        lineHeight: 0.8,
        fontWeight: 'bold',
        letterSpacing: '-2px'
    }}>
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </span>

    {/* The Label (Dark Grey) - INCREASED SIZE */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '160px', // Increased from 120px
        color: '#333', 
        lineHeight: 0.8,
        marginLeft: '2px',
        fontWeight: 'bold'
    }}>
      {label.charAt(0)}
    </span>
  </div>
);

/* =========================================
   3. MAIN COMPONENT
   ========================================= */
const Countdown = ({ targetDate }) => {
  
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        position: 'relative', 
        zIndex: 5,
        marginTop: '20px'
    }}>
      <TimeGroup val={timeLeft.days} label="Days" />
      <TimeGroup val={timeLeft.hours} label="Hours" />
      <TimeGroup val={timeLeft.minutes} label="Minutes" />
      <TimeGroup val={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;