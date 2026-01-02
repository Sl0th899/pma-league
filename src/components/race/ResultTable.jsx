import React from 'react';
import driversList from '../../data/drivers.json';

const ResultTable = ({ data }) => {
  
  // New Helper: Find driver by their UNIQUE ID
  const getDriverDetails = (id) => {
    const found = driversList.find(d => d.id === id);
    if (found) return found;
    
    // Fallback if ID is wrong or missing
    return { name: id, team: "Unknown", "Driver Number": "-" };
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
            <th width="20%">Team</th>
            <th width="20%">Gap</th>
            <th width="5%">Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            // MAGIC HAPPENS HERE: We use the ID to get the full info
            const driverInfo = getDriverDetails(row.driverId);
            
            return (
              <tr key={row.driverId}>
                <td className={getPosClass(row.pos, row.status)}>{row.pos}</td>
                
                {/* Driver Name + Number */}
                <td>
                  <div style={{fontWeight:'bold'}}>{driverInfo.name}</div>
                  <div style={{fontSize:'11px', color:'#666'}}>#{driverInfo["Driver Number"]}</div>
                </td>
                
                {/* Team Name */}
                <td style={{fontSize:'12px', color:'#aaa'}}>{driverInfo.team}</td>
                
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