import React from 'react';

const TrackStats = ({ mapUrl, stats, incidents }) => {
  return (
    <div className="panel">
      <div className="panel-header">Track & Highlights</div>
      
      <div className="track-placeholder">
        <img src={mapUrl} alt="Track Map" />
      </div>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="stat-label">Winner</div>
          <div className="stat-value">{stats.winner}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Pole Position</div>
          <div className="stat-value">{stats.pole}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Fastest Lap</div>
          <div className="stat-value">{stats.fastestLap}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Driver of Day</div>
          <div className="stat-value">{stats.driverOfDay}</div>
        </div>
      </div>

      <div className="panel-header" style={{ fontSize: '14px' }}>Incident Report</div>
      <ul className="incident-list">
        {incidents.map((inc, i) => (
          <li key={i}>{inc}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrackStats;