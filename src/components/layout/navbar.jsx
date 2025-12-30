import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      backgroundColor: '#1e1e1e', 
      padding: '15px 20px', 
      marginBottom: '20px', 
      borderBottom: '2px solid var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ backgroundColor: 'var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>PMA</span>
        LEAGUE
      </Link>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Home</Link>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Dashboard</Link>
        <Link to="/news" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>News</Link>
      </div>
    </nav>
  );
};

export default Navbar;