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
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    {/* Number - USING VW UNITS TO SCALE WITH SCREEN */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '13vw', /* Responsive size: 13% of screen width */
        color: '#f0f0f0',
        lineHeight: 0.8,
        fontWeight: 'bold',
        letterSpacing: '-0.05em' /* Tighten letters slightly */
    }}>
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </span>

    {/* Label (D, H, M, S) */}
    <span style={{
        fontFamily: 'Moret, sans-serif',
        fontSize: '13vw', /* Match the number size */
        color: '#222',    /* Dark grey to blend with background */
        lineHeight: 0.8,
        fontWeight: 'bold',
        marginLeft: '0.2vw', /* Tiny gap between number and letter */
        marginRight: '2vw'   /* Gap between this group and the next */
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
        alignItems: 'baseline',
        width: '100%',
        position: 'relative', 
        zIndex: 5,
        marginTop: '10px',
        whiteSpace: 'nowrap', /* Forces everything to stay on one line */
        overflow: 'hidden'    /* Prevents horizontal scrollbars */
    }}>
      <TimeGroup val={timeLeft.days} label="Days" />
      <TimeGroup val={timeLeft.hours} label="Hours" />
      <TimeGroup val={timeLeft.minutes} label="Minutes" />
      {/* The last group needs no right margin, but the TimeGroup component adds it. 
          That's fine, it will just add a little spacing on the right edge. */}
      <TimeGroup val={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;