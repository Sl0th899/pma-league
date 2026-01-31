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

  const [hoveredMap, setHoveredMap] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const nextRace = useMemo(() => {
    const now = new Date();
    return seasonSchedule.find(race => new Date(race.dateTime) > now);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        <style>{`
            @font-face { font-family: 'GR'; src: url('/fonts/GR.ttf') format('truetype'); }
            @font-face { font-family: 'Moret'; src: url('/fonts/Moret-Regular.ttf') format('truetype'); }
            @font-face { font-family: 'Against'; src: url('/fonts/against-regular.ttf') format('truetype'); }

            .calendar-grid { display: grid; grid-template-columns: 10% 40% 30% 20%; align-items: center; padding: 0 20px; }
            @keyframes swipe-calendar { 0% { transform: translateX(-101%); } 100% { transform: translateX(101%); } }
            @keyframes text-appear { 0% { opacity: 0; } 51% { opacity: 1; } 100% { opacity: 1; } }
            
            .reveal-row { position: relative; overflow: hidden; border-bottom: 2px solid #111; transition: background-color 0.2s; }
            .reveal-row:hover { background-color: #1a1a1a; z-index: 10; border-bottom: 2px solid transparent; }
            .reveal-content { opacity: 0; animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; font-family: 'GR', sans-serif; text-transform: uppercase; letter-spacing: 0.5px; padding: 18px 0; }
            .reveal-block-cal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0466c8; transform: translateX(-101%); z-index: 2; animation: swipe-calendar 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
            .schedule-header { font-family: sans-serif; font-size: 12px; color: #888; padding: 15px 0; border-bottom: 2px solid #444; margin-bottom: 0; background: #151515; }

            /* --- NEW COUNTDOWN STYLES --- */
            .countdown-wrapper {
                position: relative;
                text-align: center;
                padding: 60px 0;
                background-color: #121212; 
                border-top: 4px solid var(--accent);
                overflow: visible; 
            }
            .next-race-label {
                font-family: sans-serif;
                font-size: 10px;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 3px;
                margin-bottom: 10px;
            }
            .track-icon-small {
                width: 30px;
                height: auto;
                margin-bottom: 10px;
                filter: invert(1) opacity(0.5); 
            }
            .race-day-script {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-5deg);
                /* CHANGED FONT TO 'Against' */
                font-family: 'Against', sans-serif; 
                /* SMALLER SIZE */
                font-size: 80px; 
                /* NEW BLUE COLOR */
                color: #0096c7; 
                z-index: 10; 
                pointer-events: none; 
                white-space: nowrap;
                opacity: 0.9;
                /* Mix blend mode multiply helps it sit 'on' the text if desired, or normal to sit on top */
                mix-blend-mode: normal; 
            }
        `}</style>

        {/* --- HEADER --- */}
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
        
        {/* --- SCHEDULE LIST (Now First) --- */}
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

        {/* --- NEW COUNTDOWN SECTION (Now at Bottom) --- */}
        {nextRace ? (
            <div className="countdown-wrapper">
                <img src={getMapUrl(nextRace.map)} alt="Track" className="track-icon-small" />
                <div className="next-race-label">NEXT RACE BEGINS IN...</div>
                
                {/* The Countdown Component */}
                <Countdown targetDate={nextRace.dateTime} />

                {/* The "Race Day" Overlay Script */}
                <div className="race-day-script">Race Day</div>
            </div>
        ) : (
            <div style={{ textAlign: 'center', color: '#666', padding: '30px', background: '#1a1a1a' }}>Season Completed</div>
        )}

    </div>
  );
};

export default Calendar;