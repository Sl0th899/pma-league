/* =========================================
   0. IMPORTS
   ========================================= */
import React, { useState, useMemo, useEffect, useRef } from 'react';
import seasonSchedule from '../data/schedule.json';
import Countdown from '../components/layout/Countdown'; 

/* =========================================
   1. HELPER FUNCTIONS
   ========================================= */
const getMapUrl = (filename) => `/tracks/${filename}`;

const getFlagUrl = (countryName) => {
    const filename = countryName.toLowerCase().replace(/ /g, '-');
    return `/flags/${filename}.png`; 
};

/* =========================================
   2. MAIN COMPONENT
   ========================================= */
const Calendar = () => {

  const [hoveredMap, setHoveredMap] = useState(null);
  
  // --- PHYSICS ENGINE FOR CURSOR ---
  // We use refs instead of state for position to avoid re-rendering the whole component 60 times a second.
  const popupRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 }); // Where the mouse IS
  const currentPos = useRef({ x: 0, y: 0 }); // Where the popup IS (Lagging behind)

  // 1. Track Mouse Instantly
  const handleMouseMove = (e) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  };

  // 2. Animation Loop (The Lag Effect)
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (popupRef.current) {
        // "Lerp" (Linear Interpolation) formula for smooth following
        // The 0.1 factor determines the "heaviness" (lower = slower lag)
        const ease = 0.1;
        
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

        // Apply direct DOM manipulation for maximum performance
        popupRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const nextRace = useMemo(() => {
    const now = new Date();
    return seasonSchedule.find(race => new Date(race.dateTime) > now);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', margin: '0 -20px' }}>
        
        <style>{`
            @font-face { font-family: 'GR'; src: url('/fonts/GR.ttf') format('truetype'); }
            @font-face { font-family: 'Moret'; src: url('/fonts/Moret-Regular.ttf') format('truetype'); }
            @font-face { font-family: 'Against'; src: url('/fonts/against-regular.ttf') format('truetype'); }

            .calendar-grid { display: grid; grid-template-columns: 10% 40% 30% 20%; align-items: center; padding: 0 20px; }
            
            @keyframes swipe-calendar { 0% { transform: translateX(-101%); } 40% { transform: translateX(0); } 60% { transform: translateX(0); } 100% { transform: translateX(101%); } }
            @keyframes text-appear { 0% { opacity: 0; } 50% { opacity: 0; } 51% { opacity: 1; } 100% { opacity: 1; } }
            
            .reveal-row { position: relative; overflow: hidden; border-bottom: 2px solid #111; transition: background-color 0.2s; }
            .reveal-row:hover { background-color: #1a1a1a; z-index: 10; border-bottom: 2px solid transparent; }
            .reveal-content { opacity: 0; animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; font-family: 'GR', sans-serif; text-transform: uppercase; letter-spacing: 0.5px; padding: 18px 0; display: grid; width: 100%; }
            .reveal-block-cal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0466c8; transform: translateX(-101%); z-index: 2; animation: swipe-calendar 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
            .schedule-header { font-family: sans-serif; font-size: 12px; color: #888; padding: 15px 0; border-bottom: 2px solid #444; margin-bottom: 0; background: #151515; }

            /* --- NEW NEON FOLDER POPUP STYLES --- */
            .cursor-map-popup {
                position: fixed; 
                top: 0; 
                left: 0;
                width: 240px;
                height: 220px;
                background-color: #ccff0000; /* lie. */
                border-radius: 0 16px 16px 16px; /* Round all except top-left */
                z-index: 9999;
                pointer-events: none; /* Mouse passes through */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                transition: opacity 0.2s ease;
                /* Important: Initially offset to align the tab with the cursor */
                margin-top: 20px; 
                margin-left: 20px;
            }

            /* The "Tab" part of the folder */
            .cursor-map-popup::before {
                content: '';
                position: absolute;
                top: -25px; /* Height of the tab */
                left: 0;
                width: 100px; /* Width of the tab */
                height: 25px;
                background-color: #ccff0000; /* lie. */
                border-radius: 12px 12px 0 0; /* Round top corners */
            }

            .cursor-map-popup.visible {
                opacity: 1;
            }

            .cursor-map-popup img {
                width: 90%;
                height: 80%;
                object-fit: contain;
                /* Force track map to be BLACK to contrast with Neon Yellow */
                filter: brightness(0); 
                z-index: 2;
            }

            .popup-label {
                position: absolute;
                bottom: 15px;
                font-size: 14px;
                color: black; /* Black text on Neon */
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-family: 'Against', sans-serif;
            }

            .countdown-wrapper { text-align: center; padding: 0; }
            .next-race-label { font-family: sans-serif; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 20px; }
            .track-icon-large { width: 90px; height: auto; margin-bottom: 20px; }
        `}</style>

        {/* 3.2 CALENDAR PANEL */}
        <div className="panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
            <div style={{ 
                display: 'flex', flexDirection: 'column', 
                padding: '30px 30px 0 30px', 
                background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)',
                borderBottom: '4px solid var(--accent)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ fontFamily: 'Against', fontSize: '40px', color: 'white', lineHeight: '1' }}>PMA</div>
                    <div style={{ borderLeft: '1px solid #555', paddingLeft: '20px' }}>
                        <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            PMA Formula 1 Season 1 World Championship
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'italic' }}>
                            Official Calendar
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="schedule-list" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
                <div className="schedule-header calendar-grid">
                    <span style={{ textAlign: 'center' }}>Rnd</span>
                    <span style={{ textAlign: 'left' }}>Location</span>
                    <span style={{ textAlign: 'center' }}>When</span>
                    <span style={{ textAlign: 'center' }}>Laps</span>
                </div>

                {seasonSchedule.map((race, index) => (
                    <div 
                      key={race.round} 
                      className="reveal-row"
                      onMouseEnter={() => setHoveredMap(race)}
                      onMouseLeave={() => setHoveredMap(null)}
                    >
                        <div className="reveal-block-cal" style={{ animationDelay: `${index * 0.1}s` }} />
                        <div className="reveal-content calendar-grid" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#666' }}>
                                {String(race.round).padStart(2, '0')}
                            </div>
                            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '24px', fontWeight: 'bold' }}>
                                {race.country}
                                <img src={getFlagUrl(race.country)} alt={race.country} style={{ height: '20px', width: 'auto', borderRadius: '2px', opacity: 0.8 }} />
                                {race.sprint && (
                                    <span style={{ backgroundColor: 'white', color: 'black', fontSize: '11px', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold', verticalAlign: 'middle', fontFamily: 'sans-serif' }}>SPRINT</span>
                                )}
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>{race.date}</div>
                            <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>{race.laps}</div>
                        </div>
                    </div>
                ))}
                
                {/* --- FLOATING POPUP (With Physics Ref) --- */}
                <div 
                  ref={popupRef}
                  className={`cursor-map-popup ${hoveredMap ? 'visible' : ''}`}
                >
                   {hoveredMap && (
                      <>
                          <img src={getMapUrl(hoveredMap.map)} alt={hoveredMap.country} onError={(e) => e.target.style.display = 'none'} />
                          <div className="popup-label">{hoveredMap.country}</div>
                      </>
                   )}
                </div>
            </div>
        </div>

        {/* 3.3 COUNTDOWN */}
        {nextRace && (
            <div className="countdown-wrapper">
                <img src={getMapUrl(nextRace.map)} alt="Track" className="track-icon-large" />
                <div className="next-race-label">NEXT RACE BEGINS IN...</div>
                <Countdown targetDate={nextRace.dateTime} />
            </div>
        )}

    </div>
  );
};

export default Calendar;