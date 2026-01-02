import React from 'react';
import driversList from '../../data/drivers.json';

const QualiTable = ({ data }) => {

  const getDriverInfo = (nameInResult) => {
    const found = driversList.find(d => 
      d.name.toLowerCase().includes(nameInResult.toLowerCase()) || 
      d.id.includes(nameInResult.toLowerCase())
    );
    return found ? { team: found.team, number: found["Driver Number"] } : { team: "-", number: "-" };
  };

  return (
    <div className="panel">
      <div className="panel-header">Qualifying Results</div>
      <table>
        <thead>
          <tr>
            <th width="10%">Pos</th>
            <th>Driver</th>
            <th>Team</th>
            <th width="25%">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const info = getDriverInfo(row.driver);

            return (
              <tr key={row.driver}>
                <td className={row.pos <= 3 ? `p${row.pos}` : ''}>{row.pos}</td>
                
                {/* Driver & Number */}
                <td>
                  <span style={{fontWeight:'bold'}}>{row.driver}</span>
                  <span style={{fontSize:'10px', color:'#666', marginLeft:'5px'}}>#{info.number}</span>
                </td>

                {/* Team */}
                <td style={{fontSize:'12px', color:'#aaa'}}>{info.team}</td>

                <td className={row.pos === 1 ? 'pole-time' : ''}>{row.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QualiTable;