import React from 'react';
import { useParams, Link } from 'react-router-dom';
import raceData from '../data/races.json';

// Import our new components
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

  return (
    <div>
      <header>
        <div>
          <h1>Round {race.round} - {race.grandPrix} GP</h1>
        </div>
        <div className="subtitle">PMA LEAGUE (S{race.season})</div>
      </header>

      {/* CHANGED: Inline style for 2-column layout */}
      <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Left Column: Track Info (Sticky so it stays visible as you scroll) */}
        <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
          <TrackStats 
            mapUrl={race.trackMapUrl} 
            stats={race.stats} 
            incidents={race.incidents} 
          />
        </div>

        {/* Right Column: Stacked Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quali on TOP */}
          <QualiTable data={race.qualiResults} />
          
          {/* Race Results BELOW */}
          <ResultTable data={race.raceResults} />
        </div>

      </div>

      {/* Bottom Full Width: Strategy */}
      <StrategyChart data={race.strategies} />
    </div>
  );
};

export default RaceResults;