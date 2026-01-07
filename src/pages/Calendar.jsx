import React, { useState } from 'react';
import seasonSchedule from '../data/schedule.json';

const Calendar = () => {
  const [hoveredMap, setHoveredMap] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const getMapUrl = (filename) => `/tracks/${filename}`;

  const getFlagUrl = (countryName) => {
      const filename = countryName.toLowerCase().replace(/ /g, '-');
      return `/flags/${filename}.png`; 
  };

  return (
    <div className="panel">
        {/* Internal Styles for Animation & Fonts */}
        <style>{`
            /* 1. Load the Custom Font */
            @font-face {
                font-family: 'GR';
                src: url('/fonts/GR.ttf') format('truetype');
            }

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
            }
            .reveal-content {
                opacity: 0;
                animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
                
                /* 2. Apply New Font ONLY to content */
                font-family: 'GR', sans-serif; 
                letter-spacing: 1px; /* Optional: Adjust if font is tight */
            }
            .reveal-block {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0466c8; /* 3. Updated Color */
                transform: translateX(-101%);
                z-index: 2;
                animation: block-swipe 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
            }
        `}</style>

        <div className="panel-header">Official Season 1 Calendar</div>
        
        <div className="schedule-list" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
            {/* HEADER: Font remains default (untouched) */}
            <div className="schedule-header" style={{ display: 'flex', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ width: '10%' }}>Rnd</span>
                {/* Increased width to 45% to fill the gap */}
                <span style={{ width: '45%' }}>Location</span> 
                <span style={{ width: '25%' }}>When</span>
                <span style={{ width: '20%' }}>Laps</span>
                {/* Removed the empty 10% span here */}
            </div>

            {seasonSchedule.map((race, index) => (
                <div 
                  key={race.round} 
                  className="schedule-row reveal-row"
                  onMouseEnter={() => setHoveredMap(race)}
                  onMouseLeave={() => setHoveredMap(null)}
                  style={{ marginBottom: '5px' }} // Spacing between rows
                >
                    {/* The Swipe Bar */}
                    <div 
                        className="reveal-block" 
                        style={{ animationDelay: `${index * 0.1}s` }} 
                    />

                    {/* The Content */}
                    <div 
                        className="reveal-content"
                        style={{ 
                            display: 'flex', 
                            width: '100%', 
                            alignItems: 'center', 
                            padding: '10px 0', // Vertical padding for rows
                            animationDelay: `${index * 0.1}s` 
                        }}
                    >
                        {/* RND: 10% */}
                        <div className="schedule-rnd" style={{ width: '10%', fontSize: '20px', opacity: 0.5 }}>
                            {String(race.round).padStart(2, '0')}
                        </div>
                        
                        {/* LOCATION: 45% (Matches Header) */}
                        <div className="schedule-name" style={{ width: '45%', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '24px', textTransform: 'uppercase' }}>
                            {race.country}
                            
                            <img 
                                src={getFlagUrl(race.country)} 
                                alt={race.country} 
                                style={{ 
                                    height: '20px', 
                                    width: 'auto', 
                                    borderRadius: '4px',
                                }}
                            />

                            {race.sprint && <span className="sprint-badge">SPRINT</span>}
                        </div>

                        {/* DATE: 25% */}
                        <div className="schedule-date" style={{ width: '25%', fontSize: '18px' }}>
                            {race.date}
                        </div>

                        {/* LAPS: 20% */}
                        <div className="schedule-laps" style={{ width: '20%', fontSize: '18px', fontWeight: 'bold' }}>
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