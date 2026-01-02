import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json';

const Home = () => {

  // --- 1. Quick Calculation for Top 3 Only ---
  const topTeams = useMemo(() => {
    const teamScores = {};

    const addPoints = (team, amount) => {
        if (!team || team === "Unknown") return;
        if (!teamScores[team]) teamScores[team] = 0;
        teamScores[team] += amount;
    };

    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        // Priority: Result override > Driver Default
        let team = result.team;
        if (!team) {
            const driver = driversList.find(d => d.id === result.driverId);
            if (driver) team = driver.team;
        }
        addPoints(team, result.points || 0);
      });

      // Bonus Points (Pole/Fastest Lap)
      const addBonus = (id) => {
          if(!id) return;
          const driver = driversList.find(d => d.id === id);
          if (driver) addPoints(driver.team, 1);
      };
      addBonus(race.stats.poleId);
      addBonus(race.stats.fastestLapId);
    });

    return Object.entries(teamScores)
      .map(([team, points]) => ({ team, points }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 3);
  }, []);

  const getDriverName = (id) => {
    const driver = driversList.find(d => d.id === id);
    return driver ? driver.name : "Unknown";
  };

  const getTeamLogo = (teamName) => {
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  return (
    <div>
      
      {/* --- CHAMPIONSHIP POINTER (Clickable) --- */}
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <div 
            className="panel" 
            style={{ 
                marginBottom: '40px', 
                background: 'linear-gradient(135deg, #1e1e1e 0%, #252525 100%)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #333'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = '#333';
            }}
        >
            <div className="panel-header" style={{ borderBottomColor: 'var(--gold)', display:'flex', justifyContent:'space-between' }}>
                <span>Championship Leaders</span>
                <span style={{ fontSize:'12px', color:'var(--accent)' }}>View Full Standings ➜</span>
            </div>
            
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'flex-end', 
                textAlign: 'center', 
                padding: '20px 0' 
            }}>
                {/* 2nd Place */}
                {topTeams[1] && (
                    <div style={{ opacity: 0.8 }}>
                        <div style={{ fontSize: '12px', color: 'var(--silver)', marginBottom:'5px', fontWeight:'bold' }}>2ND</div>
                        <img src={getTeamLogo(topTeams[1].team)} alt={topTeams[1].team} style={{ height: '50px', marginBottom: '10px' }} />
                        <div style={{ fontWeight: 'bold', fontSize: '18px', color:'white' }}>{topTeams[1].team}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{topTeams[1].points} PTS</div>
                    </div>
                )}

                {/* 1st Place (Bigger) */}
                {topTeams[0] && (
                    <div style={{ transform: 'scale(1.2)', zIndex: 10 }}>
                        <div style={{ fontSize: '12px', color: 'var(--gold)', marginBottom:'5px', fontWeight:'bold' }}>1ST</div>
                        <img src={getTeamLogo(topTeams[0].team)} alt={topTeams[0].team} style={{ height: '60px', marginBottom: '10px' }} />
                        <div style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>{topTeams[0].team}</div>
                        <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{topTeams[0].points} PTS</div>
                    </div>
                )}

                {/* 3rd Place */}
                {topTeams[2] && (
                    <div style={{ opacity: 0.8 }}>
                        <div style={{ fontSize: '12px', color: 'var(--bronze)', marginBottom:'5px', fontWeight:'bold' }}>3RD</div>
                        <img src={getTeamLogo(topTeams[2].team)} alt={topTeams[2].team} style={{ height: '50px', marginBottom: '10px' }} />
                        <div style={{ fontWeight: 'bold', fontSize: '18px', color:'white' }}>{topTeams[2].team}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{topTeams[2].points} PTS</div>
                    </div>
                )}
            </div>
        </div>
      </Link>


      {/* --- RACE CALENDAR --- */}
      <div className="panel">
        <div className="panel-header">Race Calendar</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          
          {raceData.map((race) => (
            <Link to={`/race/${race.id}`} key={race.id} style={{ textDecoration: 'none' }}>
              <div 
                className="panel race-card"
                style={{ 
                  backgroundColor: '#252525', 
                  border: '1px solid #333',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  padding: '15px'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="poster-wrapper">
                    <img src={race.imgWeek} alt="Race Week" className="poster-img poster-default" />
                    <img src={race.imgDay} alt="Race Results" className="poster-img poster-hover" />
                </div>

                <h3 style={{ margin: '0 0 5px 0', color: 'white' }}>Round {race.round}</h3>
                <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '18px' }}>{race.grandPrix} GP</div>
                
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', borderTop:'1px solid #444', paddingTop:'10px' }}>
                  Winner: <span style={{ color: 'var(--gold)', fontWeight:'bold' }}>{getDriverName(race.stats.winnerId)}</span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;