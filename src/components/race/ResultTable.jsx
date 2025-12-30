import React from 'react';

const ResultTable = ({ data }) => {
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
            <th width="10%">Pos</th>
            <th>Driver</th>
            <th width="25%">Gap/Status</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.driver}>
              <td className={getPosClass(row.pos, row.status)}>{row.pos}</td>
              <td>{row.driver}</td>
              <td className={row.status === 'dnf' ? 'dnf' : ''}>{row.gap}</td>
              <td>{row.points > 0 ? `+${row.points}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;