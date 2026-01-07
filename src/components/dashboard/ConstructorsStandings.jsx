import React, { useMemo } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const ConstructorsStandings = () => {

  const standings = useMemo(() => {
    const teamsMap = {
        "Mercedes": { points: 0, drivers: [] },
        "Ferrari": { points: 0, drivers: [] },
        "Red Bull": { points: 0, drivers: [] },
        "McLaren": { points: 0, drivers: [] },
        "Aston Martin": { points: 0, drivers: [] },
        "Alpine": { points: 0, drivers: [] },
        "Williams": { points: 0, drivers: [] },
        "Haas": { points: 0, drivers: [] },
        "Sauber": { points: 0, drivers: [] },
        "Racing Bulls": { points: 0, drivers: [] },
        "BMW": { points: 0, drivers: [] },
        "Audi": { points: 0, drivers: [] },
        "Porsche": { points: 0, drivers: [] }
    };

    // Team lookup map
    // removed looping through the array every time.
    const driverLookup = {};
    
    driversList.forEach(driver => {
        // Map ID to Team
        driverLookup[driver.id] = driver.team;
        
        // Also populate the Team Roster immediately (saves filtering later)
        if (teamsMap[driver.team]) {
            teamsMap[driver.team].drivers.push(driver);
        }
    });

    // Helper: Instant lookup using our new map
    const getTeam = (driverId, resultRow) => {
        if (resultRow?.team) return resultRow.team; // Explicit team override in race result
        return driverLookup[driverId]; // O(1) lookup
    };

    const addPoints = (team, amount) => {
        if (team && teamsMap[team]) {
            teamsMap[team].points += amount;
        }
    };

    // 3. Calculate Scores
    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        const team = getTeam(result.driverId, result);
        addPoints(team, result.points || 0);
      });

      // Bonus Points
      if (race.stats.poleId) addPoints(getTeam(race.stats.poleId), 1);
      if (race.stats.fastestLapId) addPoints(getTeam(race.stats.fastestLapId), 1);
    });

    // 4. Convert Map to Sorted Array for Rendering
    return Object.entries(teamsMap)
      .map(([teamName, data]) => ({
          team: teamName,
          points: data.points,
          roster: data.drivers // We already built this list!
      }))
      .sort((a, b) => b.points - a.points);

  }, []);

  const getTeamLogo = (teamName) => {
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  return (
    <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Internal Styles */}
      <style>{`
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
          .reveal-row { position: relative; overflow: hidden; }
          .reveal-content {
              opacity: 0;
              animation: text-appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              display: flex;
              align-items: center;
              width: 100%;
          }
          .reveal-block {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: #5fadfc;
              transform: translateX(-101%);
              z-index: 2;
              animation: block-swipe 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          }
      `}</style>

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

      {/* Standings List */}
      <div className="standings-list">
        {standings.map((row, index) => (
            <div 
                key={row.team} 
                className="team-row reveal-row"
                style={{ padding: '0' }}
            >
                {/* 1. Sliding Bar */}
                <div 
                    className="reveal-block" 
                    style={{ animationDelay: `${index * 0.1}s` }} 
                />

                {/* 2. Content */}
                <div 
                    className="reveal-content"
                    style={{ 
                        animationDelay: `${index * 0.1}s`,
                        padding: '15px 20px'
                    }}
                >
                    <div className="pos" style={{ marginRight: '20px' }}>{index + 1}</div>
                    
                    <div className="team-info" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={getTeamLogo(row.team)} alt={row.team} className="team-logo-standings" onError={(e) => e.target.style.display = 'none'} />
                        <span className="team-name">{row.team}</span>
                    </div>

                    {/* Driver Roster */}
                    <div className="driver-roster">
                        {row.roster.map(d => (
                            <div key={d.id} className="driver-pill">
                                {d.name.split(' ')[0]}
                            </div>
                        ))}
                    </div>

                    <div className="pts-pill" style={{ marginLeft: 'auto' }}>
                        {row.points} <span style={{fontSize:'12px', opacity:0.7, marginLeft:'4px'}}>PTS</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructorsStandings;