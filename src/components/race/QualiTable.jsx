import React from 'react';
import driversList from '../../data/drivers.json';

const QualiTable = ({ data }) => {

  const getDriverDetails = (id) => {
    const found = driversList.find(d => d.id === id);
    return found ? found : { name: id, team: "Unknown", "Driver Number": "-" };
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
            const driverInfo = getDriverDetails(row.driverId);

            return (
              <tr key={row.driverId}>
                <td className={row.pos <= 3 ? `p${row.pos}` : ''}>{row.pos}</td>
                
                {/* Driver & Number */}
                <td>
                  <span style={{fontWeight:'bold'}}>{driverInfo.name}</span>
                  <span style={{fontSize:'10px', color:'#666', marginLeft:'5px'}}>#{driverInfo["Driver Number"]}</span>
                </td>

                {/* Team */}
                <td style={{fontSize:'12px', color:'#aaa'}}>{driverInfo.team}</td>

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