import React from 'react';
import { Link } from 'react-router-dom';
import raceData from '../data/races.json';

const Home = () => {
  return (
    <div>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)' }}>
    <span style={{ fontFamily: 'Against', marginRight: '10px' }}>PMA</span>
    LEAGUE
</h1>
        <p style={{ color: 'var(--text-muted)' }}>Season 1 Official Result Portal</p>
      </header>

      <div className="panel">
        <div className="panel-header">Race Calendar</div>
        
        {/* Grid of Race Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          
          {raceData.map((race) => (
            <Link to={`/race/${race.id}`} key={race.id} style={{ textDecoration: 'none' }}>
              <div 
                className="panel" 
                style={{ 
                  backgroundColor: '#252525', 
                  border: '1px solid #333',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '100px', backgroundColor: '#111', marginBottom: '10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#555', overflow:'hidden' }}>
                  <img src={race.trackMapUrl} alt="Track" style={{width:'80%', opacity: 0.6}} />
                </div>
                <h3 style={{ margin: '0 0 5px 0', color: 'white' }}>Round {race.round}</h3>
                <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{race.grandPrix} GP</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
                  Winner: <span style={{ color: 'var(--gold)' }}>{race.stats.winner}</span>
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