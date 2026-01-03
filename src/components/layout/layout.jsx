import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;