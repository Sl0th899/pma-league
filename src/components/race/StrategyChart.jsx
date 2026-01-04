import React from 'react';
import driversList from '../../data/drivers.json'; // 1. Import the drivers list

const StrategyChart = ({ data }) => {

  // 2. Helper function to find the name from the ID
  const getDriverName = (id) => {
    const driver = driversList.find(d => d.id === id);
    // Returns the driver name, or falls back to the ID if not found
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

      <div className="strat-grid">
        {data.map((driverStrat) => (
          // 3. Changed key to use driverId
          <div className="strat-row" key={driverStrat.driverId}>
            
            {/* 4. Use the helper function to display the Real Name */}
            <div className="strat-driver">
                {getDriverName(driverStrat.driverId)}
            </div>

            <div className="strat-track">
              {driverStrat.stints.map((stint, index) => (
                <div
                  key={index}
                  className={`stint-bar bg-${stint.compound}`}
                  style={{ width: `${stint.percent}%` }}
                  data-info={stint.label}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lap-axis">
        <span>Start</span>
        <span>Mid Race</span>
        <span>Finish</span>
      </div>
    </div>
  );
};

export default StrategyChart;