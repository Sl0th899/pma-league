import React from 'react';
import driversList from '../../data/drivers.json'; // <--- Added Import

const TrackStats = ({ mapUrl, stats, incidents }) => {

  // Helper to find name by ID
  const getDriverName = (id) => {
    if (!id) return "-";
    const driver = driversList.find(d => d.id === id);
    return driver ? driver.name : id; // Fallback to ID if name not found
  };

  return (
    <div className="panel">
      <div className="panel-header">Track & Highlights</div>
      
      <div className="track-placeholder">
        <img src={mapUrl} alt="Track Map" />
      </div>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="stat-label">Winner</div>
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            {getDriverName(stats.winnerId)}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Pole Position</div>
          <div className="stat-value" style={{ color: 'var(--pole)' }}>
            {getDriverName(stats.poleId)}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Fastest Lap</div>
          <div className="stat-value" style={{ color: '#d946ef' }}>
            {getDriverName(stats.fastestLapId)}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Driver of Day</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>
            {getDriverName(stats.driverOfDayId)}
          </div>
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