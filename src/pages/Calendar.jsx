/* =========================================
   0. IMPORTS
   ========================================= */
import React, { useState, useMemo } from 'react';
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

  /* --- STATE & VARIABLES --- */
  const [hoveredMap, setHoveredMap] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  /* --- LOGIC: FIND NEXT RACE --- */
  // Finds the first race in the future based on the ISO timestamp
  const nextRace = useMemo(() => {
    const now = new Date();
    return seasonSchedule.find(race => new Date(race.dateTime) > now);
  }, []);

  /* --- HANDLERS --- */
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  /* =========================================
     3. RENDER
     ========================================= */
  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
        
        {/* 3.1 INTERNAL STYLES (Specific to this page) */}
        <style>{`
            @font-face {
                font-family: 'GR';
                src: url('/fonts/GR.ttf') format('truetype');
            }
            .calendar-grid {
                display: grid;
                grid-template-columns: 10% 40% 30% 20%; 
                align-items: center;
                padding: 0 20px;
            }
            @keyframes swipe-calendar {
                0% { transform: translateX(-101%); }
                40% { transform: translateX(0); }
                60% { transform: translateX(0); }
                100% { transform: translateX(101%); }
            }
            @keyframes text-appear {
                0% { opacity: 0; }
                50% { opacity: 0; }
                51% { opacity: 1; }
                100% { opacity: 1; }
            }
            .reveal-row {
                position: relative;
                overflow: hidden;
                border-bottom: 2px solid #111;
                transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s;
            }
            .reveal-row:hover {
                transform: translateY(-5px);
                background-color: #1a1a1a;
                box-shadow: 0 10px 20px rgba(0,0,0,0.5);
                z-index: 10;
                border-bottom: 2px solid transparent;
            }
            .reveal-content {
                opacity: 0;
                animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
                font-family: 'GR', sans-serif;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                padding: 18px 0; 
            }
            .reveal-block-cal {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: #0466c8;
                transform: translateX(-101%);
                z-index: 2;
                animation: swipe-calendar 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; 
            }
            .schedule-header {
                font-family: sans-serif;
                font-size: 12px;
                color: #888;
                padding: 15px 0;
                border-bottom: 2px solid #444;
                margin-bottom: 0;
                background: #151515;
            }
        `}</style>

        {/* 3.2 HEADER SECTION & COUNTDOWN */}
        <div style={{ 
            display: 'flex', flexDirection: 'column', 
            padding: '30px', 
            borderBottom: '4px solid var(--accent)',
            background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)'
        }}>
            {/* Title Block */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
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

            {/* Countdown Block */}
            {nextRace ? (
             <div style={{ borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                   Next Race: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{nextRace.country} GP</span>
                </div>
                <Countdown targetDate={nextRace.dateTime} />
             </div>
           ) : (
             <div style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>Season Completed</div>
           )}
        </div>
        
        {/* 3.3 SCHEDULE LIST */}
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
                    {/* The Blue Swipe Animation Block */}
                    <div 
                        className="reveal-block-cal" 
                        style={{ animationDelay: `${index * 0.1}s` }} 
                    />

                    {/* The Row Content */}
                    <div 
                        className="reveal-content calendar-grid"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#666' }}>
                            {String(race.round).padStart(2, '0')}
                        </div>
                        <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.country}
                            <img 
                                src={getFlagUrl(race.country)} 
                                alt={race.country} 
                                style={{ height: '20px', width: 'auto', borderRadius: '2px', opacity: 0.8 }}
                            />
                            {race.sprint && (
                                <span style={{ 
                                    backgroundColor: 'white', color: 'black', fontSize: '11px', 
                                    padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'sans-serif',
                                    verticalAlign: 'middle'
                                }}>SPRINT</span>
                            )}
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.date}
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.laps}
                        </div>
                    </div>
                </div>
            ))}

            {/* 3.4 FLOATING MAP CURSOR */}
            <div 
              className={`cursor-map-popup ${hoveredMap ? 'visible' : ''}`}
              style={{ top: `${cursorPos.y + 20}px`, left: `${cursorPos.x + 20}px` }}
            >
               {hoveredMap && (
                  <>
                      <img src={getMapUrl(hoveredMap.map)} alt={hoveredMap.country} onError={(e) => e.target.style.display = 'none'} />
                      <div className="popup-label">{hoveredMap.country} Layout</div>
                  </>
               )}
            </div>
        </div>
    </div>
  );
};

export default Calendar;