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
   2. SUB-COMPONENTS (The new design)
   ========================================= */
const TimeBox = ({ val, label }) => (
  <div style={{ 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: '0 10px',
      height: '160px',
      width: '140px'
  }}>
    {/* The Background Label (D, H, M, S) */}
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Moret, sans-serif',
        fontSize: '180px',
        color: '#222', // Very dark grey, subtle
        zIndex: 1,
        lineHeight: 1,
        userSelect: 'none'
    }}>
      {label.charAt(0)}
    </div>

    {/* The Number */}
    <div style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '130px',
        color: '#f0f0f0', // Bright white/grey
        zIndex: 5,
        position: 'relative',
        lineHeight: 1,
        textShadow: '0 5px 15px rgba(0,0,0,0.5)'
    }}>
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </div>
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
    <div className="countdown-container" style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
      <TimeBox val={timeLeft.days} label="Days" />
      <TimeBox val={timeLeft.hours} label="Hrs" />
      <TimeBox val={timeLeft.minutes} label="Mins" />
      <TimeBox val={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;