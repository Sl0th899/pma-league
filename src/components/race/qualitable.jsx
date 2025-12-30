import React from 'react';

const qualitable = ({ data }) => {
  return (
    <div className="panel">
      <div className="panel-header">Qualifying Results</div>
      <table>
        <thead>
          <tr>
            <th width="10%">Pos</th>
            <th>Driver</th>
            <th width="30%">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.driver}>
              <td className={row.pos <= 3 ? `p${row.pos}` : ''}>{row.pos}</td>
              <td>{row.driver}</td>
              <td className={row.pos === 1 ? 'pole-time' : ''}>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default qualitable;