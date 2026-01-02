import React, { useMemo } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const ConstructorsStandings = () => {

  const standings = useMemo(() => {
    // 1. Define all teams
    const INITIAL_TEAMS = {
        "Mercedes": 0,
        "Ferrari": 0,
        "Red Bull": 0,
        "McLaren": 0,
        "Aston Martin": 0,
        "Alpine": 0,
        "Williams": 0,
        "Haas": 0,
        "Sauber": 0,
        "Racing Bulls": 0,
        "BMW": 0,
        "Audi": 0,
        "Porsche": 0 
    };

    const teamScores = { ...INITIAL_TEAMS };

    const addPointsToTeam = (teamName, amount) => {
        if (!teamName || teamName === "Unknown") return;
        if (teamScores[teamName] === undefined) teamScores[teamName] = 0;
        teamScores[teamName] += amount;
    };

    const resolveTeam = (driverId, resultRow = null) => {
        if (resultRow && resultRow.team) return resultRow.team; // Override check
        const driver = driversList.find(d => d.id === driverId);
        if (driver) return driver.team;
        return null;
    };

    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        const team = resolveTeam(result.driverId, result);
        addPointsToTeam(team, result.points || 0);
      });

      if (race.stats.poleId) {
          const team = resolveTeam(race.stats.poleId);
          addPointsToTeam(team, 1);
      }
      if (race.stats.fastestLapId) {
          const team = resolveTeam(race.stats.fastestLapId);
          addPointsToTeam(team, 1);
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

  // NEW: Find all drivers currently listed for this team
  const getDriversForTeam = (teamName) => {
      return driversList.filter(d => d.team === teamName);
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
        {standings.map((row, index) => {
          const teamDrivers = getDriversForTeam(row.team);

          return (
            <div key={row.team} className="team-row">
                <div className="pos">{index + 1}</div>
                
                <div className="team-info">
                <img src={getTeamLogo(row.team)} alt={row.team} className="team-logo-standings" onError={(e) => e.target.style.display = 'none'} />
                <span className="team-name">{row.team}</span>
                </div>

                {/* --- NEW: Driver Roster (Hidden by default) --- */}
                <div className="driver-roster">
                    {teamDrivers.map(d => (
                        <div key={d.id} className="driver-pill">
                            {d.name.split(' ')[0]} {/* Shows First Name/Handle only to save space */}
                        </div>
                    ))}
                </div>

                <div className="pts-pill">
                {row.points} <span style={{fontSize:'12px', opacity:0.7, marginLeft:'4px'}}>PTS</span>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConstructorsStandings;