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
  <div style={{ display: 'flex', alignItems: 'baseline', margin: '0 10px' }}>
    {/* The Number (Bright White) */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '120px', // Bigger as requested
        color: '#f0f0f0',
        lineHeight: 1,
        fontWeight: 'bold'
    }}>
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </span>

    {/* The Label (Dark Grey, Next to it) */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '120px', 
        color: '#333', // Dark grey to recede into background
        lineHeight: 1,
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
        zIndex: 5 
    }}>
      <TimeGroup val={timeLeft.days} label="Days" />
      <TimeGroup val={timeLeft.hours} label="Hours" />
      <TimeGroup val={timeLeft.minutes} label="Minutes" />
      <TimeGroup val={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;