import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 1. Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Dynamic Variables based on scroll state
  const navPadding = isScrolled ? '10px 20px' : '25px 40px';
  const logoSize = isScrolled ? '24px' : '32px';
  const linkSize = isScrolled ? '14px' : '16px';
  const blockPadding = isScrolled ? '8px 16px' : '12px 24px';

  // 3. Helper for the Link Blocks
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      fontSize: linkSize,
      color: 'white',
      textDecoration: 'none',
      backgroundColor: isActive ? 'var(--accent)' : '#2a2a2a', // Blocks!
      padding: blockPadding,
      borderRadius: '4px', // Slight rounded corners
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    };
  };

  return (
    <nav style={{ 
      backgroundColor: '#1e1e1e', 
      padding: navPadding, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', // Smooth "Apple-like" transition
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.6)' : 'none', // Shadow only when scrolled
      marginBottom: '20px' 
    }}>
      
      {/* LEFT: Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <span style={{ 
            fontFamily: 'Against', 
            fontWeight: 'normal', 
            fontSize: logoSize,
            color: 'white',
            letterSpacing: '2px',
            transition: 'font-size 0.4s ease'
        }}>
            PMA | FATE
        </span>
      </Link>
      
      {/* RIGHT: Block Links */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={getLinkStyle('/')}>Home</Link>
        <Link to="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>
        <Link to="/news" style={getLinkStyle('/news')}>News</Link>
      </div>
    </nav>
  );
};

export default Navbar;