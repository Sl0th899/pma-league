import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json';

const SEASON_SCHEDULE = [
  { round: 1, country: 'AUSTRALIA', flag: '🇦🇺', date: '20-21 DEC', laps: 30, sprint: false, map: 'australia.avif' },
  { round: 2, country: 'AZERBAIJAN', flag: '🇦🇿', date: '27-28 DEC', laps: 30, sprint: true, map: 'azerbaijan.avif' },
  { round: 3, country: 'RUSSIA', flag: '🇷🇺', date: '3-4 JAN', laps: 25, sprint: false, map: 'russia.avif' },
  { round: 4, country: 'GERMANY', flag: '🇩🇪', date: '10-11 JAN', laps: 35, sprint: false, map: 'germany.avif' },
  { round: 5, country: 'FRANCE', flag: '🇫🇷', date: '17-18 JAN', laps: 32, sprint: false, map: 'france.avif' },
  { round: 6, country: 'BRITAIN', flag: '🇬🇧', date: '24-25 JAN', laps: 25, sprint: true, map: 'britain.avif' },
  { round: 7, country: 'ITALY', flag: '🇮🇹', date: '7-8 FEB', laps: 30, sprint: false, map: 'italy.avif' },
  { round: 8, country: 'MIAMI', flag: '🇺🇸', date: '14-15 FEB', laps: 28, sprint: false, map: 'miami.avif' },
  { round: 9, country: 'MEXICO', flag: '🇲🇽', date: '21-22 FEB', laps: 30, sprint: false, map: 'mexico.avif' },
  { round: 10, country: 'JAPAN', flag: '🇯🇵', date: '28-1 MAR', laps: 33, sprint: false, map: 'japan.avif' },
  { round: 11, country: 'QATAR', flag: '🇶🇦', date: '7-8 MAR', laps: 28, sprint: true, map: 'qatar.avif' },
  { round: 12, country: 'USA', flag: '🇺🇸', date: '14-15 MAR', laps: 30, sprint: false, map: 'usa.avif' },
];

const Home = () => {
  // --- 1. Find the Upcoming Race ---

  const lastCompletedRound = Math.max(...raceData.map(r => r.round), 0);
  const nextRoundNumber = lastCompletedRound + 1;
  const nextRace = SEASON_SCHEDULE.find(r => r.round === nextRoundNumber) || SEASON_SCHEDULE[0]; 

  // --- 2. Constructors Logic (Same as before) ---
  const topTeams = useMemo(() => {
    const teamScores = {};
    const addPoints = (team, amount) => {
        if (!team || team === "Unknown") return;
        if (!teamScores[team]) teamScores[team] = 0;
        teamScores[team] += amount;
    };
    raceData.forEach(race => {
      race.raceResults.forEach(result => {
        let team = result.team;
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
  const getMapUrl = (filename) => `/tracks/${filename}`;

  return (
    <div>
      
      {/* 1. CHAMPIONSHIP LEADER WIDGET */}
      <Link to="/championship" style={{ textDecoration: 'none' }}>
        <div className="podium-widget">
            <div className="blur-content">
                <div style={{ textAlign:'center', marginBottom:'20px', textTransform:'uppercase', letterSpacing:'2px', color:'var(--text-muted)', fontSize:'12px' }}>
                    Constructors' Championship Top 3
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '40px', textAlign: 'center' }}>
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
            <div className="blur-overlay">
                <div className="view-btn">View Full Standings ➜</div>
            </div>
        </div>
      </Link>

      {/* 2. UPCOMING RACE WIDGET (New!) */}
      {nextRace && (
        <div className="panel" style={{ 
            marginBottom: '40px', 
            background: 'linear-gradient(90deg, #151515 0%, #1e1e1e 100%)',
            borderLeft: '4px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0' 
        }}>
            
            {/* Left: Info */}
            <div style={{ padding: '30px' }}>
                <div style={{ 
                    color: 'var(--accent)', 
                    fontWeight: 'bold', 
                    fontSize: '14px', 
                    letterSpacing: '2px', 
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{ 
                        width: '8px', height: '8px', backgroundColor: 'var(--accent)', borderRadius: '50%', 
                        boxShadow: '0 0 10px var(--accent)' 
                    }}></span>
                    UPCOMING EVENT
                </div>
                
                <div style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1', textTransform: 'uppercase' }}>
                    {nextRace.country}
                </div>
                
                <div style={{ 
                    marginTop: '15px', 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: 'var(--text-muted)',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px' 
                }}>
                    <span>{nextRace.date}</span>
                    <span style={{ width: '1px', height: '20px', backgroundColor: '#444' }}></span>
                    <span>ROUND {nextRace.round}</span>
                    {nextRace.sprint && (
                        <span style={{ 
                            backgroundColor: 'white', color: 'black', fontSize: '12px', 
                            padding: '4px 8px', borderRadius: '4px', verticalAlign: 'middle' 
                        }}>SPRINT</span>
                    )}
                </div>
            </div>

            {/* Right: Map & Flag */}
            <div style={{ 
                position: 'relative', 
                width: '40%', 
                height: '200px', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                 {/* Big Faded Flag in Background */}
                <div style={{ 
                    position: 'absolute', 
                    fontSize: '150px', 
                    opacity: '0.1', 
                    right: '-20px', 
                    top: '20px', 
                    filter: 'grayscale(100%)' 
                }}>
                    {nextRace.flag}
                </div>

                {/* Track Map */}
                <img 
                    src={getMapUrl(nextRace.map)} 
                    alt={nextRace.country}
                    style={{ 
                        width: '80%', 
                        height: '80%', 
                        objectFit: 'contain', 
                        zIndex: 2,
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' 
                    }}
                    onError={(e) => e.target.style.display = 'none'}
                />
            </div>
        </div>
      )}

      {/* 3. LATEST RESULTS GRID (Renamed from Race Calendar) */}
      <div className="panel" style={{ marginBottom: '40px' }}>
        <div className="panel-header">Latest Results</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {raceData.map((race) => (
            <Link to={`/race/${race.id}`} key={race.id} style={{ textDecoration: 'none' }}>
              <div 
                className="panel race-card"
                style={{ backgroundColor: '#252525', border: '1px solid #333', transition: 'transform 0.2s', cursor: 'pointer', padding: '15px' }}
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