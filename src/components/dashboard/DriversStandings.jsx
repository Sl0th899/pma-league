import React, { useMemo, useState, useEffect, useRef } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const DriversStandings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => { if (currentElement) observer.unobserve(currentElement); };
  }, []);

  const standings = useMemo(() => {
    const driverMap = {};
    driversList.forEach(d => {
        driverMap[d.id] = { ...d, points: 0 };
    });
    raceData.forEach(race => {
        race.raceResults.forEach(result => {
            if (driverMap[result.driverId]) driverMap[result.driverId].points += (result.points || 0);
        });
        if (race.stats.poleId && driverMap[race.stats.poleId]) driverMap[race.stats.poleId].points += 1;
        if (race.stats.fastestLapId && driverMap[race.stats.fastestLapId]) driverMap[race.stats.fastestLapId].points += 1;
    });
    return Object.values(driverMap)
        .sort((a, b) => b.points - a.points)
        .filter(d => d.points > 0 || d.team !== "Free Agent"); 
  }, []);

  const getTeamLogo = (teamName) => {
    if (!teamName) return null;
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  return (
    <div 
        ref={domRef}
        className={`panel ${isVisible ? 'is-visible' : ''}`} 
        // FIX: opacity is now conditional. If visible = 1, else = 0.
        style={{ padding: '0', overflow: 'hidden', marginTop: '40px', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <style>{`
          .panel.is-visible { opacity: 1; }
          @keyframes swipe-drivers {
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
          .reveal-row { position: relative; overflow: hidden; border-bottom: 1px solid #333; }
          
          /* Only animate when parent has .is-visible class */
          .is-visible .reveal-content {
              opacity: 0;
              animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              display: flex; align-items: center; width: 100%;
          }
          .is-visible .reveal-block-driver {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: #0F96C8; 
              transform: translateX(-101%);
              z-index: 2;
              animation: swipe-drivers 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          }
      `}</style>

      <div style={{ 
          display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', 
          borderBottom: '4px solid #0F96C8',
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)'
      }}>
        <div style={{ fontFamily: 'Against', fontSize: '40px', color: 'white', lineHeight: '1' }}>PMA</div>
        <div style={{ borderLeft: '1px solid #555', paddingLeft: '20px' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PMA Formula 1 Season 1 World Championship
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'italic' }}>
            Drivers' Championship
          </div>
        </div>
      </div>

      <div className="standings-list">
        {standings.map((driver, index) => (
            <div key={driver.id} className="team-row reveal-row" style={{ padding: '0' }}>
                <div 
                    className="reveal-block-driver" 
                    style={{ animationDelay: `${index * 0.1}s` }} 
                />
                <div 
                    className="reveal-content" 
                    style={{ animationDelay: `${index * 0.1}s`, padding: '15px 20px' }}
                >
                    <div className="pos" style={{ marginRight: '20px' }}>{index + 1}</div>
                    <div className="team-info" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={getTeamLogo(driver.team)} alt={driver.team} className="team-logo-standings" onError={(e) => e.target.style.display = 'none'} />
                        <span className="team-name">{driver.name}</span>
                        <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>{driver.team}</span>
                    </div>
                    <div className="pts-pill" style={{ marginLeft: 'auto' }}>
                        {driver.points} <span style={{fontSize:'12px', opacity:0.7, marginLeft:'4px'}}>PTS</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DriversStandings;