import React from 'react';

const tyreStrat = ({ data }) => {
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
          <div className="strat-row" key={driverStrat.driver}>
            <div className="strat-driver">{driverStrat.driver}</div>
            <div className="strat-track">
              {driverStrat.stints.map((stint, index) => (
                <div
                  key={index}
                  className={`stint-bar bg-${stint.compound}`}
                  style={{ width: `${stint.percent}%` }}
                  data-info={stint.label} // This triggers the CSS tooltip
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

export default tyreStrat;