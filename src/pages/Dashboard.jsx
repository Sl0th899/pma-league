import React from 'react';
import ConstructorsStandings from '../components/dashboard/ConstructorsStandings';
import DriversStandings from '../components/dashboard/DriversStandings'; 

const Dashboard = () => {
  return (
    <div className="fade-in">

        <ConstructorsStandings />
        <DriversStandings />
        <div style={{ height: '50px' }}></div>

    </div>
  );
};

export default Dashboard;