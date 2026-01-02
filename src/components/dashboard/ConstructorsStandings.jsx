import React, { useMemo } from 'react';
import raceData from '../../data/races.json';
import driversList from '../../data/drivers.json';

const ConstructorsStandings = () => {

  const standings = useMemo(() => {
    // 1. Define all teams you want to appear (even if 0 points)
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
        "Porsche": 0  // <--- Added Porsche here!
    };

    // Copy initial state so we don't mutate it
    const teamScores = { ...INITIAL_TEAMS };

    // Helper to add points
    const addPointsToTeam = (teamName, amount) => {
        if (!teamName || teamName === "Unknown") return;
        
        if (teamScores[teamName] === undefined) {
            teamScores[teamName] = 0; // Initialize if it's a new team we missed
        }
        teamScores[teamName] += amount;
    };

    // Helper to resolve which team gets the points
    const resolveTeam = (driverId, resultRow = null) => {
        // Priority 1: Did we manually override the team in races.json? (e.g. Sport_Beast in Haas)
        if (resultRow && resultRow.team) {
            return resultRow.team;
        }

        // Priority 2: Look up the current team in drivers.json
        const driver = driversList.find(d => d.id === driverId);
        if (driver) return driver.team;

        return null;
    };

    raceData.forEach(race => {
      // 1. Race Result Points
      race.raceResults.forEach(result => {
        const team = resolveTeam(result.driverId, result);
        addPointsToTeam(team, result.points || 0);
      });

      // 2. Bonus Points (+1 for Pole)
      if (race.stats.poleId) {
          const team = resolveTeam(race.stats.poleId);
          addPointsToTeam(team, 1);
      }

      // 3. Bonus Points (+1 for Fastest Lap)
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