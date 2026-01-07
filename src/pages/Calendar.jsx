import React, { useState } from 'react';
import seasonSchedule from '../data/schedule.json';

// --- Helpers ---
const getMapUrl = (filename) => `/tracks/${filename}`;
const getFlagUrl = (countryName) => {
    const filename = countryName.toLowerCase().replace(/ /g, '-');
    return `/flags/${filename}.png`; 
};

const Calendar = () => {
  const [hoveredMap, setHoveredMap] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
        <style>{`
            /* 1. Custom Font */
            @font-face {
                font-family: 'GR';
                src: url('/fonts/GR.ttf') format('truetype');
            }

            /* 2. Grid Layout - Centered Alignment Approach */
            .calendar-grid {
                display: grid;
                /* Rnd (10%) | Location (40%) | When (30%) | Laps (20%) */
                grid-template-columns: 10% 40% 30% 20%; 
                align-items: center;
                padding: 0 20px;
            }

            /* Animations */
            @keyframes block-swipe {
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
            .reveal-block {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: #0466c8;
                transform: translateX(-101%);
                z-index: 2;
                animation: swipe-calendar 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; 
            }

            /* Header Styling */
            .schedule-header {
                font-family: sans-serif;
                font-size: 12px;
                color: #888;
                padding: 15px 0;
                border-bottom: 2px solid #444;
                margin-bottom: 0;
                background: #151515; /* Matches panel bg */
            }
        `}</style>

        {/* --- NEW HEADER (Matches Constructors Standings) --- */}
        <div style={{ 
            display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', 
            borderBottom: '4px solid var(--accent)',
            background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)'
        }}>
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
        
        <div className="schedule-list" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
            
            {/* Table Header */}
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
                    <div 
                        className="reveal-block" 
                        style={{ animationDelay: `${index * 0.1}s` }} 
                    />

                    <div 
                        className="reveal-content calendar-grid"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Round (Centered) */}
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#666' }}>
                            {String(race.round).padStart(2, '0')}
                        </div>
                        
                        {/* Location (Left Aligned) */}
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

                        {/* When (Centered) */}
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.date}
                        </div>

                        {/* Laps (Centered) */}
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.laps}
                        </div>
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
    </div>
  );
};

export default Calendar;