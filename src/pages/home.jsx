import React from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json'; // <--- Added Import

const Home = () => {

  // Helper to resolve ID to Name
  const getDriverName = (id) => {
    const driver = driversList.find(d => d.id === id);
    return driver ? driver.name : "Unknown";
  };

  return (
    <div>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)' }}>
            <span style={{ fontFamily: 'Against', fontWeight: 'normal', marginRight: '10px' }}>PMA</span>
            LEAGUE
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Season 1 - Official Results Portal</p>
      </header>

      <div className="panel">
        <div className="panel-header">Race Calendar</div>
        
        {/* Grid of Race Cards */}
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
                {/* Image Swap Container */}
                <div className="poster-wrapper">
                    <img src={race.imgWeek} alt="Race Week" className="poster-img poster-default" />
                    <img src={race.imgDay} alt="Race Results" className="poster-img poster-hover" />
                </div>

                <h3 style={{ margin: '0 0 5px 0', color: 'white' }}>Round {race.round}</h3>
                <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '18px' }}>{race.grandPrix} GP</div>
                
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', borderTop:'1px solid #444', paddingTop:'10px' }}>
                  {/* UPDATED: Uses winnerId to look up the name */}
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