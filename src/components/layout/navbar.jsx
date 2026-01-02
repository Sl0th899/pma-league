import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detect Scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Styles based on Scroll
  const navPadding = isScrolled ? '15px 20px' : '30px 40px';
  const logoSize = isScrolled ? '24px' : '32px';
  const linkSize = isScrolled ? '14px' : '16px';
  const blockPadding = isScrolled ? '6px 12px' : '10px 20px';

  // Helper for Block Style
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      fontSize: linkSize,
      color: 'white',
      textDecoration: 'none',
      backgroundColor: isActive ? 'var(--accent)' : '#333', // Active = Red, Inactive = Dark Grey
      padding: blockPadding,
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      display: 'inline-block'
    };
  };

  return (
    <nav style={{ 
      backgroundColor: '#1e1e1e', 
      padding: navPadding, 
      marginBottom: '20px', 
      // Removed the red border-bottom line as requested
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 10px rgba(0,0,0,0.5)' : 'none'
    }}>
      {/* LEFT SIDE: Logo */}
      <Link to="/" style={{ 
          fontSize: logoSize, 
          color: 'white', 
          display:'flex', 
          alignItems:'center', 
          gap:'10px',
          textDecoration: 'none',
          transition: 'font-size 0.3s ease'
      }}>
        <span style={{ 
            fontFamily: 'Against', 
            fontWeight: 'normal', 
            letterSpacing: '1px'
        }}>
            PMA | FATE
        </span>
      </Link>
      
      {/* RIGHT SIDE: Block Links */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>Home</Link>
        <Link to="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>
        <Link to="/news" style={getLinkStyle('/news')}>News</Link>
      </div>
    </nav>
  );
};

export default Navbar;