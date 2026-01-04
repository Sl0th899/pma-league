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
        <div className="panel-header">Official Season 1 Calendar</div>
        
        <div className="schedule-list" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
            <div className="schedule-header">
                <span style={{ width: '10%' }}>Rnd</span>
                <span style={{ width: '35%' }}>Location</span>
                <span style={{ width: '25%' }}>When</span>
                <span style={{ width: '20%' }}>Laps</span>
                <span style={{ width: '10%' }}></span>
            </div>

            {seasonSchedule.map((race) => (
                <div 
                  key={race.round} 
                  className="schedule-row"
                  onMouseEnter={() => setHoveredMap(race)}
                  onMouseLeave={() => setHoveredMap(null)}
                >
                    {/* Convert number 1 to string "01" for display */}
                    <div className="schedule-rnd">
                        {String(race.round).padStart(2, '0')}
                    </div>
                    
                    {/* LOCATION COLUMN */}
                    <div className="schedule-name" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {race.country}
                        
                        {/* CHANGED: Replaced the emoji span with an Image tag */}
                        <img 
                            src={getFlagUrl(race.country)} 
                            alt={race.country} 
                            style={{ 
                                height: '20px',       // Adjust height to fit text
                                width: 'auto', 
                                borderRadius: '2px',  // Optional: slight rounded corners
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)' // Optional: shadow for depth
                            }}
                        />

                        {race.sprint && <span className="sprint-badge">SPRINT</span>}
                    </div>

                    <div className="schedule-date">{race.date}</div>
                    <div className="schedule-laps">{race.laps}</div>
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