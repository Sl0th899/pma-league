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
      {/* LEFT SIDE: New Logo Design */}
      <Link to="/" style={{ 
          fontSize: '24px',  /* Made slightly bigger */
          color: 'white', 
          display:'flex', 
          alignItems:'center', 
          gap:'10px',
          textDecoration: 'none'
      }}>
        <span style={{ 
            fontFamily: 'Against', 
            fontWeight: 'normal', 
            letterSpacing: '1px'
        }}>
            PMA | FATE
        </span>
      </Link>
      
      {/* RIGHT SIDE: Links */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Home</Link>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Dashboard</Link>
        <Link to="/news" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>News</Link>
      </div>
    </nav>
  );
};

export default Navbar;