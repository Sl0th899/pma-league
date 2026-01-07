import React, { useState } from 'react';
import seasonSchedule from '../data/schedule.json';

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
    <div className="panel">
        <style>{`
            /* 1. Custom Font */
            @font-face {
                font-family: 'GR';
                src: url('/fonts/GR.ttf') format('truetype');
            }

            /* 2. The "Efficient" Grid System */
            .calendar-grid {
                display: grid;
                /* Define your column widths HERE once. */
                grid-template-columns: 12% 43% 25% 20%; 
                align-items: center;
                padding: 0 10px; /* Slight padding on sides */
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
            }
            .reveal-content {
                opacity: 0;
                animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
                font-family: 'GR', sans-serif;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                padding: 18px 0; /* Vertical Size of rows */
            }
            .reveal-block {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0466c8;
                transform: translateX(-101%);
                z-index: 2;
                animation: block-swipe 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
            }

            /* Header Specific Styling */
            .schedule-header {
                font-family: sans-serif;
                font-size: 12px;
                color: #888;
                padding-bottom: 10px;
                border-bottom: 2px solid #444;
                margin-bottom: 0;
            }
        `}</style>

        <div className="panel-header">Official Season 1 Calendar</div>
        
        <div className="schedule-list" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
            
            {/* HEADER: Uses .calendar-grid to match rows perfectly */}
            <div className="schedule-header calendar-grid">
                <span>Rnd</span>
                <span>Location</span>
                <span>When</span>
                <span style={{ textAlign: 'right' }}>Laps</span>
            </div>

            {seasonSchedule.map((race, index) => (
                <div 
                  key={race.round} 
                  className="reveal-row"
                  onMouseEnter={() => setHoveredMap(race)}
                  onMouseLeave={() => setHoveredMap(null)}
                >
                    {/* The Swipe Animation Bar */}
                    <div 
                        className="reveal-block" 
                        style={{ animationDelay: `${index * 0.1}s` }} 
                    />

                    {/* CONTENT: Also uses .calendar-grid */}
                    <div 
                        className="reveal-content calendar-grid"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Round */}
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#666' }}>
                            {String(race.round).padStart(2, '0')}
                        </div>
                        
                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '24px', fontWeight: 'bold' }}>
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

                        {/* When */}
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {race.date}
                        </div>

                        {/* Laps */}
                        <div style={{ textAlign: 'right', fontSize: '24px', fontWeight: 'bold' }}>
                            {race.laps}
                        </div>
                    </div>
                </div>
            ))}

            {/* Hover Popup Logic */}
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