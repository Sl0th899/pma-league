import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json';

// --- DATA: Full Season Schedule (Updated for Local AVIF Maps) ---
const SEASON_SCHEDULE = [
  { round: '01', name: 'Australia GP', date: '20-21 Dec', laps: 30, sprint: false, map: 'australia.avif' },
  { round: '02', name: 'Azerbaijan GP', date: '27-28 Dec', laps: 30, sprint: true, map: 'azerbaijan.avif' },
  { round: '03', name: 'Russian GP', date: '3-4 Jan', laps: 25, sprint: false, map: 'russia.avif' },
  { round: '04', name: 'German GP', date: '10-11 Jan', laps: 35, sprint: false, map: 'germany.avif' },
  { round: '05', name: 'French GP', date: '17-18 Jan', laps: 32, sprint: false, map: 'france.avif' },
  { round: '06', name: 'British GP', date: '24-25 Jan', laps: 25, sprint: true, map: 'britain.avif' },
  { round: '07', name: 'Italian GP', date: '7-8 Feb', laps: 30, sprint: false, map: 'italy.avif' },
  { round: '08', name: 'Miami GP', date: '14-15 Feb', laps: 28, sprint: false, map: 'miami.avif' },
  { round: '09', name: 'Mexico GP', date: '21-22 Feb', laps: 30, sprint: false, map: 'mexico.avif' },
  { round: '10', name: 'Japan GP', date: '28-1 Mar', laps: 33, sprint: false, map: 'japan.avif' },
  { round: '11', name: 'Qatar GP', date: '7-8 Mar', laps: 28, sprint: true, map: 'qatar.avif' },
  { round: '12', name: 'United States GP', date: '14-15 Mar', laps: 30, sprint: false, map: 'usa.avif' },
];

const Home = () => {

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

  // UPDATED: Now points to your local 'public/tracks' folder
  const getMapUrl = (filename) => {
      return `/tracks/${filename}`;
  };

  return (
    <div>
      
      {/* 1. CHAMPIONSHIP LEADER WIDGET */}
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
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

      {/* 2. RACE CALENDAR GRID */}
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

      {/* 3. SEASON SCHEDULE LIST */}
      <div className="panel">
          <div className="panel-header">Season 1 Schedule</div>
          
          <div className="schedule-list">
              <div className="schedule-header">
                  <span style={{ width: '10%' }}>Rnd</span>
                  <span style={{ width: '35%' }}>Grand Prix</span>
                  <span style={{ width: '25%' }}>Date</span>
                  <span style={{ width: '20%' }}>Distance</span>
                  <span style={{ width: '10%' }}></span>
              </div>

              {SEASON_SCHEDULE.map((race) => (
                  <div key={race.round} className="schedule-row">
                      <div className="schedule-rnd">{race.round}</div>
                      <div className="schedule-name">
                          {race.name}
                          {race.sprint && <span className="sprint-badge">SPRINT</span>}
                      </div>
                      <div className="schedule-date">{race.date}</div>
                      <div className="schedule-laps">{race.laps} Laps</div>
                      
                      {/* Hover Popup using Local Maps */}
                      <div className="track-popup">
                          <img 
                            src={getMapUrl(race.map)} 
                            alt={race.name} 
                            onError={(e) => e.target.style.display = 'none'} 
                          />
                          <div className="popup-label">{race.name} Layout</div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default Home;