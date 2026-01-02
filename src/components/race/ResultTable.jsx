import React from 'react';
import driversList from '../../data/drivers.json'; // <--- Import the database

const ResultTable = ({ data }) => {
  
  // Helper function to find driver details
  const getDriverInfo = (nameInResult) => {
    // 1. Try to find an exact match or partial match
    const found = driversList.find(d => 
      d.name.toLowerCase().includes(nameInResult.toLowerCase()) || 
      d.id.includes(nameInResult.toLowerCase())
    );

    // 2. Return the details or placeholders if not found
    return found ? { 
      team: found.team, 
      number: found["Driver Number"] 
    } : { team: "-", number: "-" };
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
            // "Look up" the info for this row
            const info = getDriverInfo(row.driver);
            
            return (
              <tr key={row.driver}>
                <td className={getPosClass(row.pos, row.status)}>{row.pos}</td>
                
                {/* Driver Name + Number */}
                <td>
                  <div style={{fontWeight:'bold'}}>{row.driver}</div>
                  <div style={{fontSize:'10px', color:'#666'}}>#{info.number}</div>
                </td>
                
                {/* Team Name */}
                <td style={{fontSize:'12px', color:'#aaa'}}>{info.team}</td>
                
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