import React, { useMemo } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const ConstructorsStandings = () => {

  const standings = useMemo(() => {
    const teamScores = {};

    // Helper to add points to a specific team
    const addPoints = (driverId, amount) => {
        if (!driverId) return;
        const driver = driversList.find(d => d.id === driverId);
        if (driver && driver.team && driver.team !== "Unknown") {
            if (!teamScores[driver.team]) teamScores[driver.team] = 0;
            teamScores[driver.team] += amount;
        }
    };

    raceData.forEach(race => {
      // 1. Race Result Points
      race.raceResults.forEach(result => {
        addPoints(result.driverId, result.points || 0);
      });

      // 2. Bonus Points (+1 for Pole)
      if (race.stats.poleId) {
          addPoints(race.stats.poleId, 1);
      }

      // 3. Bonus Points (+1 for Fastest Lap)
      if (race.stats.fastestLapId) {
          addPoints(race.stats.fastestLapId, 1);
      }
    });

    return Object.entries(teamScores)
      .map(([team, points]) => ({ team, points }))
      .sort((a, b) => b.points - a.points);
  }, []);

  const getTeamLogo = (teamName) => {
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Header */}
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
            Constructors' Championship
          </div>
        </div>
      </div>

      {/* Standings */}
      <div className="standings-list">
        {standings.map((row, index) => (
          <div key={row.team} className="team-row">
            <div className="pos">{index + 1}</div>
            <div className="team-info">
              <img src={getTeamLogo(row.team)} alt={row.team} className="team-logo-standings" onError={(e) => e.target.style.display = 'none'} />
              <span className="team-name">{row.team}</span>
            </div>
            <div className="pts-pill">
              {row.points} <span style={{fontSize:'12px', opacity:0.7, marginLeft:'4px'}}>PTS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructorsStandings;