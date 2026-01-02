import React from 'react';
import driversList from '../../data/drivers.json';

const ResultTable = ({ data, qualiData }) => {
  
  const getDriverDetails = (id) => {
    const found = driversList.find(d => d.id === id);
    if (found) return found;
    return { name: id, team: "Unknown", "Driver Number": "-" };
  };

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

  // --- Logic: Calculate Position Change ---
  const getPositionChange = (driverId, finishPos) => {
    if (!qualiData) return <span style={{color:'#444'}}>-</span>;

    const qualiRow = qualiData.find(q => q.driverId === driverId);
    
    // If driver didn't qualify or we can't find them, show nothing
    if (!qualiRow) return <span style={{color:'#444'}}>-</span>;

    const startPos = qualiRow.pos;
    const diff = startPos - finishPos; // e.g. Start 10, Finish 5 = +5 (Gained)

    if (diff > 0) {
      return <span style={{color: '#36c756', fontSize:'12px'}}>▲ {diff}</span>; // Green Up Arrow
    } else if (diff < 0) {
      return <span style={{color: '#ff4d4d', fontSize:'12px'}}>▼ {Math.abs(diff)}</span>; // Red Down Arrow
    } else {
      return <span style={{color: '#666', fontSize:'16px'}}>-</span>; // Grey Dash (No change)
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">Race Classification</div>
      <table>
        <thead>
          <tr>
            {/* 1. +/- Column (Moved First) */}
            <th width="5%">+/-</th> 
            
            {/* 2. Position Column */}
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
                {/* 1. Positions Gained/Lost (Moved First) */}
                <td style={{ textAlign: 'center' }}>
                    {getPositionChange(row.driverId, row.pos)}
                </td>

                {/* 2. Finishing Position */}
                <td className={getPosClass(row.pos, row.status)}>{row.pos}</td>
                
                {/* 3. Driver Info */}
                <td>
                  <div style={{fontWeight:'bold', fontSize: '15px'}}>{driverInfo.name}</div>
                  <div style={{
                      fontSize:'14px', 
                      fontWeight: 'bold', 
                      color:'var(--accent)', 
                      marginTop: '2px'
                  }}>
                    #{driverInfo["Driver Number"]}
                  </div>
                </td>
                
                {/* 4. Team Logo */}
                <td>
                  <img 
                    src={getTeamLogo(driverInfo.team)} 
                    alt={driverInfo.team} 
                    style={{ maxHeight: '25px', maxWidth: '40px', objectFit: 'contain' }}
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.style.display = 'none'; 
                        e.target.parentNode.innerText = driverInfo.team; 
                    }}
                  />
                </td>
                
                {/* 5. Gap & Points */}
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