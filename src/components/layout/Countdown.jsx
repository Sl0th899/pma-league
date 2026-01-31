/* =========================================
   0. IMPORTS
   ========================================= */
import React, { useState, useEffect } from 'react';

/* =========================================
   1. Math (Helper Functions)
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
   2. Visuals (Sub-components)
   ========================================= */
// days, Hrs, etc.
const TimeBox = ({ val, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
    {/* number box */}
    <div style={{
        background: '#222',
        color: 'var(--accent)', 
        fontSize: '32px',
        fontWeight: 'bold',
        width: '70px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        fontFamily: 'monospace' 
    }}>
      {/* "5" becomes "05") */}
      {val !== undefined ? String(val).padStart(2, '0') : '00'}
    </div>

    {/* Labels*/}
    <div style={{ 
        fontSize: '12px', 
        textTransform: 'uppercase', 
        color: '#888', 
        marginTop: '5px',
        fontWeight: 'bold'
    }}>
      {label}
    </div>
  </div>
);

/* =========================================
   3. MAIN (state & effects)
   ========================================= */
const Countdown = ({ targetDate }) => {
  // prevent "00" flash on load
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  // Update the timer every 1sec 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    // Cleanup interval when component leaves screen
    return () => clearInterval(timer);
  }, [targetDate]);

  /* =========================================
     4. RENDER
     ========================================= */
  return (
    <div className="countdown-container" style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <TimeBox val={timeLeft.days} label="Days" />
      <TimeBox val={timeLeft.hours} label="Hrs" />
      <TimeBox val={timeLeft.minutes} label="Mins" />
      <TimeBox val={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;