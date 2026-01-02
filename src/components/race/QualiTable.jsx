import React from 'react';
import driversList from '../../data/drivers.json';

const QualiTable = ({ data }) => {

  const getDriverDetails = (id) => {
    const found = driversList.find(d => d.id === id);
    return found ? found : { name: id, team: "Unknown", "Driver Number": "-" };
  };

  const getTeamLogo = (teamName) => {
    if (!teamName) return null;
    const filename = teamName.toLowerCase().replace(/ /g, "-");
    return `/teams/${filename}.png`;
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
                
                {/* Driver & BIG Number */}
                <td>
                  <span style={{fontWeight:'bold', fontSize:'15px'}}>{driverInfo.name}</span>
                  <span style={{
                      fontSize:'14px', /* Increased size */
                      fontWeight: 'bold',
                      color:'var(--accent)', 
                      marginLeft:'8px'
                  }}>
                      #{driverInfo["Driver Number"]}
                  </span>
                </td>

                {/* Team Logo */}
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