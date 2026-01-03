import React, { useState } from 'react';

// --- DATA: Same Schedule Data ---
const SEASON_SCHEDULE = [
  { round: '01', country: 'AUSTRALIA', flag: '🇦🇺', date: '20-21 DEC', laps: 30, sprint: false, map: 'australia.avif' },
  { round: '02', country: 'AZERBAIJAN', flag: '🇦🇿', date: '27-28 DEC', laps: 30, sprint: true, map: 'azerbaijan.avif' },
  { round: '03', country: 'RUSSIA', flag: '🇷🇺', date: '3-4 JAN', laps: 25, sprint: false, map: 'russia.avif' },
  { round: '04', country: 'GERMANY', flag: '🇩🇪', date: '10-11 JAN', laps: 35, sprint: false, map: 'germany.avif' },
  { round: '05', country: 'FRANCE', flag: '🇫🇷', date: '17-18 JAN', laps: 32, sprint: false, map: 'france.avif' },
  { round: '06', country: 'BRITAIN', flag: '🇬🇧', date: '24-25 JAN', laps: 25, sprint: true, map: 'britain.avif' },
  { round: '07', country: 'ITALY', flag: '🇮🇹', date: '7-8 FEB', laps: 30, sprint: false, map: 'italy.avif' },
  { round: '08', country: 'MIAMI', flag: '🇺🇸', date: '14-15 FEB', laps: 28, sprint: false, map: 'miami.avif' },
  { round: '09', country: 'MEXICO', flag: '🇲🇽', date: '21-22 FEB', laps: 30, sprint: false, map: 'mexico.avif' },
  { round: '10', country: 'JAPAN', flag: '🇯🇵', date: '28-1 MAR', laps: 33, sprint: false, map: 'japan.avif' },
  { round: '11', country: 'QATAR', flag: '🇶🇦', date: '7-8 MAR', laps: 28, sprint: true, map: 'qatar.avif' },
  { round: '12', country: 'USA', flag: '🇺🇸', date: '14-15 MAR', laps: 30, sprint: false, map: 'usa.avif' },
];

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

            {SEASON_SCHEDULE.map((race) => (
                <div 
                  key={race.round} 
                  className="schedule-row"
                  onMouseEnter={() => setHoveredMap(race)}
                  onMouseLeave={() => setHoveredMap(null)}
                >
                    <div className="schedule-rnd">{race.round}</div>
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