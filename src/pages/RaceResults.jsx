import React from 'react';
import { useParams, Link } from 'react-router-dom';
import raceData from '../data/races.json';

// Import our new components
import TrackStats from 'C:\Users\prana\Desktop\Wheels\PMA-MAIN\src\components\race\trackstats.jsx';
import ResultTable from 'C:\Users\prana\Desktop\Wheels\PMA-MAIN\src\components\race\ResultTable.jsx';
import QualiTable from 'C:\Users\prana\Desktop\Wheels\PMA-MAIN\src\components\race\qualitable.jsx';
import StrategyChart from 'C:\Users\prana\Desktop\Wheels\PMA-MAIN\src\components\race\tyreStrat.jsx';

const RaceResults = () => {
  const { roundId } = useParams(); // Grabs 's1-r1' from the URL
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

      <div className="grid-container">
        {/* Left Column: Track Info + Incidents */}
        <TrackStats 
          mapUrl={race.trackMapUrl} 
          stats={race.stats} 
          incidents={race.incidents} 
        />

        {/* Middle Column: Race Results */}
        <ResultTable data={race.raceResults} />

        {/* Right Column: Qualifying */}
        <QualiTable data={race.qualiResults} />
      </div>

      {/* Bottom Full Width: Strategy */}
      <StrategyChart data={race.strategies} />
    </div>
  );
};

export default RaceResults;