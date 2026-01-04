import React from 'react';
import driversList from '../../data/drivers.json';

const StrategyChart = ({ data }) => {

  const getDriverName = (id) => {
    const driver = driversList.find(d => d.id === id);
    return driver ? driver.name : id; 
  };

  return (
    <div className="panel">
      <div className="panel-header">
        Tyre Strategy Analysis
        {/* Legend */}
        <div style={{ fontSize: '11px', fontWeight: 'normal', display: 'flex', gap: '8px' }}>
          <div style={{display:'flex', alignItems:'center', gap:'4px'}}><span className="tyre-badge bg-soft"></span> S</div>
          <div style={{display:'flex', alignItems:'center', gap:'4px'}}><span className="tyre-badge bg-med"></span> M</div>
          <div style={{display:'flex', alignItems:'center', gap:'4px'}}><span className="tyre-badge bg-hard"></span> H</div>
          <div style={{display:'flex', alignItems:'center', gap:'4px'}}><span className="tyre-badge bg-inter"></span> I</div>
        </div>
      </div>

      <div className="strat-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map((driverStrat) => (
          // ROW CONTAINER: Uses Flexbox to separate Name and Bar
          <div 
            className="strat-row" 
            key={driverStrat.driverId} 
            style={{ display: 'flex', alignItems: 'center', width: '100%' }}
          >
            
            {/* 1. DRIVER NAME: Fixed Width (160px) so it never gets covered */}
            <div 
                className="strat-driver" 
                style={{ 
                    width: '160px',       // Reserve space for long names
                    minWidth: '160px',    // Prevent shrinking
                    paddingRight: '15px', // Space between text and bar
                    fontSize: '12px',
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    color: '#ddd'
                }}
            >
                {getDriverName(driverStrat.driverId)}
            </div>

            {/* 2. STRATEGY BAR: Takes remaining space (flex: 1) */}
            <div 
                className="strat-track" 
                style={{ 
                    flex: 1,              // Take all remaining width
                    height: '24px',       // Fixed height for the bar container
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    display: 'flex', 
                    borderRadius: '4px', 
                    overflow: 'hidden'    // Ensures rounded corners work
                }}
            >
              {driverStrat.stints.map((stint, index) => (
                <div
                  key={index}
                  className={`stint-bar bg-${stint.compound}`}
                  style={{ width: `${stint.percent}%`, height: '100%' }}
                  data-info={stint.label}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Axis Labels: Adjusted margin to align with the new bars */}
      <div className="lap-axis" style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '160px', marginTop: '10px', fontSize: '10px', color: '#666' }}>
        <span>Start</span>
        <span>Mid Race</span>
        <span>Finish</span>
      </div>
    </div>
  );
};

export default StrategyChart;