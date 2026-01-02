import React from 'react';
import { useParams, Link } from 'react-router-dom';
import raceData from '../data/races.json';
import driversList from '../data/drivers.json'; // Needed to look up Fastest Lap name

import TrackStats from '../components/race/TrackStats';
import ResultTable from '../components/race/ResultTable';
import QualiTable from '../components/race/QualiTable';
import StrategyChart from '../components/race/StrategyChart';

const RaceResults = () => {
  const { roundId } = useParams();
  const race = raceData.find((r) => r.id === roundId);

  if (!race) {
    return <div style={{textAlign:'center', marginTop:'50px'}}>Race not found. <Link to="/" style={{color:'red'}}>Go Home</Link></div>;
  }

  // Look up Fastest Lap Driver Name
  const flDriver = driversList.find(d => d.id === race.stats.fastestLapId);
  const flName = flDriver ? flDriver.name : "Unknown";

  return (
    <div>
      <header>
        <div>
          <h1>Round {race.round} - {race.grandPrix} GP</h1>
        </div>
        <div className="subtitle">PMA LEAGUE (S{race.season})</div>
      </header>

      <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Left Column */}
        <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
          <TrackStats 
            mapUrl={race.trackMapUrl} 
            stats={race.stats} 
            incidents={race.incidents} 
          />
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <QualiTable data={race.qualiResults} />
          
          {/* --- FASTEST LAP BLOCK --- */}
          <div style={{ 
              backgroundColor: '#3b0a45', /* Purple/Pinkish background */
              borderLeft: '4px solid #d946ef', 
              padding: '15px 20px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ 
                    backgroundColor: '#d946ef', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                }}>
                    FASTEST LAP
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
                    {flName}
                </div>
             </div>
             <div style={{ color: '#d946ef', fontWeight: 'bold' }}>
                 +1 PTS
             </div>
          </div>

          <ResultTable data={race.raceResults} qualiData={race.qualiResults} />
        </div>

      </div>

      <StrategyChart data={race.strategies} />
    </div>
  );
};

export default RaceResults;