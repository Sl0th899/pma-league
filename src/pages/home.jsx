import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json';

const Home = () => {

  // --- 1. Quick Calculation for Top 3 ---
  const topTeams = useMemo(() => {
    const teamScores = {};

    const addPoints = (team, amount) => {
        if (!team || team === "Unknown") return;
        if (!teamScores[team]) teamScores[team] = 0;
        teamScores[team] += amount;
    };

    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        let team = result.team; // Check override
        if (!team) {
            const driver = driversList.find(d => d.id === result.driverId);
            if (driver) team = driver.team;
        }
        addPoints(team, result.points || 0);
      });

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
      
      {/* --- PODIUM WIDGET (Clickable + Blur Effect) --- */}
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <div className="podium-widget">
            
            {/* 1. The Content (Gets blurred on hover) */}
            <div className="blur-content">
                <div style={{ textAlign:'center', marginBottom:'20px', textTransform:'uppercase', letterSpacing:'2px', color:'var(--text-muted)', fontSize:'12px' }}>
                    Constructors' Championship Top 3
                </div>
                
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-end', 
                    gap: '40px',
                    textAlign: 'center' 
                }}>
                    
                    {/* 2nd Place (Left) */}
                    {topTeams[1] && (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                            <div style={{ color:'var(--silver)', fontWeight:'bold', marginBottom:'5px' }}>2</div>
                            <div style={{ width:'80px', height:'60px', background:'#2a2a2a', borderRadius:'8px 8px 0 0', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'4px solid var(--silver)' }}>
                                <img src={getTeamLogo(topTeams[1].team)} alt={topTeams[1].team} style={{ maxWidth:'60%', maxHeight:'80%' }} />
                            </div>
                            <div style={{ marginTop:'10px', fontSize:'14px', fontWeight:'bold', color:'white' }}>{topTeams[1].team}</div>
                            <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{topTeams[1].points} PTS</div>
                        </div>
                    )}

                    {/* 1st Place (Center - Biggest) */}
                    {topTeams[0] && (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', transform: 'scale(1.15)', zIndex: 2 }}>
                            <div style={{ color:'var(--gold)', fontWeight:'bold', marginBottom:'5px' }}>1</div>
                            <div style={{ width:'100px', height:'90px', background:'#333', borderRadius:'8px 8px 0 0', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'4px solid var(--gold)', boxShadow:'0 -4px 15px rgba(0,0,0,0.3)' }}>
                                <img src={getTeamLogo(topTeams[0].team)} alt={topTeams[0].team} style={{ maxWidth:'70%', maxHeight:'80%' }} />
                            </div>
                            <div style={{ marginTop:'10px', fontSize:'14px', fontWeight:'bold', color:'white' }}>{topTeams[0].team}</div>
                            <div style={{ fontSize:'12px', color:'var(--gold)', fontWeight:'bold' }}>{topTeams[0].points} PTS</div>
                        </div>
                    )}

                    {/* 3rd Place (Right) */}
                    {topTeams[2] && (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                            <div style={{ color:'var(--bronze)', fontWeight:'bold', marginBottom:'5px' }}>3</div>
                            <div style={{ width:'80px', height:'50px', background:'#2a2a2a', borderRadius:'8px 8px 0 0', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'4px solid var(--bronze)' }}>
                                <img src={getTeamLogo(topTeams[2].team)} alt={topTeams[2].team} style={{ maxWidth:'60%', maxHeight:'80%' }} />
                            </div>
                            <div style={{ marginTop:'10px', fontSize:'14px', fontWeight:'bold', color:'white' }}>{topTeams[2].team}</div>
                            <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{topTeams[2].points} PTS</div>
                        </div>
                    )}

                </div>
            </div>

            {/* 2. The Overlay (Appears on hover) */}
            <div className="blur-overlay">
                <div className="view-btn">View Full Standings ➜</div>
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