import React from 'react';
import driversList from '../../data/drivers.json';

const ResultTable = ({ data }) => {
  
  const getDriverDetails = (id) => {
    const found = driversList.find(d => d.id === id);
    if (found) return found;
    return { name: id, team: "Unknown", "Driver Number": "-" };
  };

  // Helper to turn "Red Bull" into "/teams/red-bull.png"
  const getTeamLogo = (teamName) => {
    if (!teamName) return null;
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
  };

  const getPosClass = (pos, status) => {
    if (status === 'dnf') return 'dnf';
    if (pos === 1) return 'p1';
    if (pos === 2) return 'p2';
    if (pos === 3) return 'p3';
    return '';
  };

  return (
    <div className="panel">
      <div className="panel-header">Race Classification</div>
      <table>
        <thead>
          <tr>
            <th width="5%">Pos</th>
            <th>Driver</th>
            <th width="15%">Team</th>
            <th width="20%">Gap</th>
            <th width="5%">Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const driverInfo = getDriverDetails(row.driverId);
            
            return (
              <tr key={row.driverId}>
                <td className={getPosClass(row.pos, row.status)}>{row.pos}</td>
                
                {/* Driver Name + BIGGER Number */}
                <td>
                  <div style={{fontWeight:'bold', fontSize: '15px'}}>{driverInfo.name}</div>
                  <div style={{
                      fontSize:'14px', /* Increased size */
                      fontWeight: 'bold', 
                      color:'var(--accent)', 
                      marginTop: '2px'
                  }}>
                    #{driverInfo["Driver Number"]}
                  </div>
                </td>
                
                {/* Team Logo instead of Text */}
                <td>
                  <img 
                    src={getTeamLogo(driverInfo.team)} 
                    alt={driverInfo.team} 
                    style={{ maxHeight: '25px', maxWidth: '40px', objectFit: 'contain' }}
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.style.display = 'none'; // Hide if image missing
                        e.target.parentNode.innerText = driverInfo.team; // Show text fallback
                    }}
                  />
                </td>
                
                <td className={row.status === 'dnf' ? 'dnf' : ''}>{row.gap}</td>
                <td>{row.points > 0 ? `+${row.points}` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;