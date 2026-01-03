import React, { useState } from 'react';
import seasonSchedule from '../data/schedule.json'; // <--- Imported data

const Calendar = () => {
  const [hoveredMap, setHoveredMap] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const getMapUrl = (filename) => `/tracks/${filename}`;

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
                    <div className="schedule-name">
                        {race.country}
                        <span className="country-flag">{race.flag}</span>
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