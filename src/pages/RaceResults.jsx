/* Race Results BELOW - Now passing qualiData too! */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import raceData from '../data/races.json';

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
          
          {/* UPDATED: Passing qualiData HERE!!!!! */}
          <ResultTable data={race.raceResults} qualiData={race.qualiResults} />
        </div>

      </div>

      <StrategyChart data={race.strategies} />
    </div>
  );
};

export default RaceResults;