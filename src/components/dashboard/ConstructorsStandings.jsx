import React, { useMemo } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const ConstructorsStandings = () => {

  // --- 1. LOGIC: Calculate Points Automatically ---
  const standings = useMemo(() => {
    const teamScores = {};

    // Loop through every race
    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        // Find the driver to get their Team Name
        const driver = driversList.find(d => d.id === result.driverId);
        if (driver && driver.team && driver.team !== "Unknown") {
          const teamName = driver.team;
          
          // Add points (if team exists, add to it; otherwise start at 0)
          if (!teamScores[teamName]) teamScores[teamName] = 0;
          teamScores[teamName] += (result.points || 0);
        }
      });
    });

    // Convert to Array and Sort by Points (Highest first)
    return Object.entries(teamScores)
      .map(([team, points]) => ({ team, points }))
      .sort((a, b) => b.points - a.points);
  }, []);

  // Helper for Logos
  const getTeamLogo = (teamName) => {
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
      
      {/* --- HEADER SECTION --- */}
      <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px', 
          padding: '30px', 
          borderBottom: '4px solid var(--accent)',
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)'
      }}>
        {/* PMA Logo (Left) */}
        <div style={{ 
            fontFamily: 'Against', 
            fontSize: '40px', 
            color: 'white', 
            lineHeight: '1' 
        }}>
          PMA
        </div>

        {/* Text Titles */}
        <div style={{ borderLeft: '1px solid #555', paddingLeft: '20px' }}>
          <div style={{ 
              fontSize: '14px', 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
          }}>
            PMA Formula 1 Season 1 World Championship
          </div>
          <div style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              fontStyle: 'italic' 
          }}>
            Constructors' Championship
          </div>
        </div>
      </div>

      {/* --- STANDINGS LIST --- */}
      <div className="standings-list">
        {standings.map((row, index) => (
          <div key={row.team} className="team-row">
            
            <div className="pos">{index + 1}</div>
            
            <div className="team-info">
              <img 
                src={getTeamLogo(row.team)} 
                alt={row.team} 
                className="team-logo-standings"
                onError={(e) => e.target.style.display = 'none'}
              />
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