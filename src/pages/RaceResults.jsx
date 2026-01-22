import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json';

import TrackStats from '../components/race/TrackStats';
import ResultTable from '../components/race/ResultTable';
import QualiTable from '../components/race/QualiTable';
import StrategyChart from '../components/race/StrategyChart';

const RaceResults = () => {
  const { roundId } = useParams();
  const [viewMode, setViewMode] = useState('gp'); 

  const race = raceData.find((r) => r.id === roundId);

  if (!race) {
    return <div style={{textAlign:'center', marginTop:'50px'}}>Race not found. <Link to="/" style={{color:'red'}}>Go Home</Link></div>;
  }

  const flDriver = driversList.find(d => d.id === race.stats.fastestLapId);
  const flName = flDriver ? flDriver.name : "Unknown";

  const hasSprint = race.sprintResults && race.sprintResults.length > 0;

  return (
    <div className="fade-in">
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1>Round {race.round} - {race.grandPrix} GP</h1>
          <div className="subtitle">PMA LEAGUE (S{race.season})</div>
        </div>

        {hasSprint && (
          <div style={{ display: 'flex', gap: '10px', background: '#222', padding: '5px', borderRadius: '8px' }}>
            <button 
              onClick={() => setViewMode('gp')}
              style={{
                background: viewMode === 'gp' ? 'var(--accent)' : 'transparent',
                color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              GRAND PRIX
            </button>
            <button 
              onClick={() => setViewMode('sprint')}
              style={{
                background: viewMode === 'sprint' ? 'var(--accent)' : 'transparent',
                color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              SPRINT
            </button>
          </div>
        )}
      </header>

      
      {viewMode === 'gp' ? (
        <>
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
            
            {/* Left Column: Stats */}
            <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
              <TrackStats 
                mapUrl={race.trackMapUrl} 
                stats={race.stats} 
                incidents={race.incidents} 
              />
            </div>

            {/* Right Column: Quali & Race */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <QualiTable data={race.qualiResults} />
              
              {/* FL Block */}
              <div style={{ 
                  backgroundColor: '#3b0a45', 
                  borderLeft: '4px solid #d946ef', 
                  padding: '15px 20px',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ backgroundColor: '#d946ef', color: 'white', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        FASTEST LAP
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{flName}</div>
                  </div>
                  <div style={{ color: '#d946ef', fontWeight: 'bold' }}>+1 PTS</div>
              </div>

              <ResultTable data={race.raceResults} qualiData={race.qualiResults} />
            </div>
          </div>
          <StrategyChart data={race.strategies} />
        </>

      ) : (
        
        /* === NEW: SPRINT VIEW === */
        <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
           
           {/* Left: Simplified Stats for Sprint (Or keep TrackStats) */}
           <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
              <div className="panel">
                <div className="panel-header">Sprint Info</div>
                <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
                  <div>Sprint Race</div>
                  <div>No Pitstops Required</div>
                </div>
              </div>
           </div>

           {/* Right: Sprint Results Table */}
           <div>
             {/* Re-using ResultTable but without Quali comparison (pass null for qualiData) */}
             <div className="panel-header" style={{ marginTop: 0 }}>Sprint Classification</div>
             <ResultTable data={race.sprintResults} qualiData={null} />
           </div>
        </div>
      )}
    </div>
  );
};

export default RaceResults;