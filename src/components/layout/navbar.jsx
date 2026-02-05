import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPadding = isScrolled ? '15px 40px' : '30px 40px';
  const logoSize = isScrolled ? '24px' : '32px';

  return (
    <nav style={{ 
      backgroundColor: 'transparent',
      padding: navPadding, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'padding 0.4s ease', 
      backdropFilter: isScrolled ? 'blur(5px)' : 'none'
    }}>
      {/* Internal Style for Speltale Font */}
      <style>{`
        @font-face {
          font-family: 'Speltale';
          src: url('/fonts/speltalefont-demo-regular.otf') format('opentype');
        }
      `}</style>
      
      {/* LEFT: Logo with Mixed Fonts */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        {/* 1. PMA: Clean, Bold, Standard Font */}
        <span style={{ 
            fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif', 
            fontWeight: '900', 
            fontSize: logoSize,
            color: 'white',
            letterSpacing: '0px',
            transition: 'font-size 0.4s ease'
        }}>
            PMA
        </span>

        {/* 2. | : Simple Separator */}
        <span style={{ fontSize: logoSize, color: '#666', fontWeight: '300' }}>|</span>

        {/* 3. FATE: The "Against" Font */}
        <span style={{ 
            fontFamily: 'Against', 
            fontWeight: 'normal', 
            fontSize: logoSize,
            color: 'white',
            letterSpacing: '2px',
            transition: 'font-size 0.4s ease'
        }}>
            FATE
        </span>
      </Link>
      
      {/* RIGHT: Navigation Links - Font Changed to Speltale */}
      <div style={{ display: 'flex', gap: '30px', fontFamily: 'Speltale, sans-serif' }}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} style={{ fontFamily: 'Speltale' }}>
            Home
        </Link>
        <Link to="/calendar" className={`nav-item ${location.pathname === '/calendar' ? 'active' : ''}`} style={{ fontFamily: 'Speltale' }}>
            Calendar
        </Link>
        <Link to="/championship" className={`nav-item ${location.pathname === '/championship' ? 'active' : ''}`} style={{ fontFamily: 'Speltale' }}>
            Championship
        </Link>
        <Link to="/news" className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`} style={{ fontFamily: 'Speltale' }}>
            News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;