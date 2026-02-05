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
  <div style={{ display: 'flex', alignItems: 'baseline', margin: '0 1vw' }}>
    {/* Number - Scaled to Viewport Width */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '12vw', 
        color: '#f0f0f0',
        lineHeight: 0.8,
        fontWeight: 'bold',
        letterSpacing: '-0.05em'
    }}>
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </span>

    {/* Label */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '12vw', 
        color: '#333', 
        lineHeight: 0.8,
        fontWeight: 'bold',
        marginLeft: '0.2vw'
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
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        marginTop: '20px',
        overflow: 'hidden' /* Safety net */
    }}>
      <TimeGroup val={timeLeft.days} label="Days" />
      <TimeGroup val={timeLeft.hours} label="Hours" />
      <TimeGroup val={timeLeft.minutes} label="Minutes" />
      <TimeGroup val={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;