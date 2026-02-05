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
      {/* Internal Styles: Font & Hover Glow */}
      <style>{`
        @font-face {
          font-family: 'Amsterdamer';
          src: url('/fonts/Amsterdamer-Garamont-Regular.ttf') format('truetype');
        }

        /* Hover Effect for Nav Links */
        .nav-link-item {
          font-family: 'Amsterdamer', sans-serif;
          font-weight: normal;
          font-size: 18px; /* Slightly bigger */
          text-decoration: none;
          color: rgba(255, 255, 255, 0.7); /* Default dimmed white */
          transition: all 0.3s ease;
        }

        .nav-link-item:hover,
        .nav-link-item.active {
          color: white;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); /* The Glow Effect */
        }
      `}</style>
      
      {/* LEFT: Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <span style={{ fontSize: logoSize, color: '#666', fontWeight: '300' }}>|</span>
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
      
      {/* RIGHT: Navigation Links */}
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link 
          to="/" 
          className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
        >
            Home
        </Link>
        <Link 
          to="/calendar" 
          className={`nav-link-item ${location.pathname === '/calendar' ? 'active' : ''}`}
        >
            Calendar
        </Link>
        <Link 
          to="/championship" 
          className={`nav-link-item ${location.pathname === '/championship' ? 'active' : ''}`}
        >
            Championship
        </Link>
        <Link 
          to="/news" 
          className={`nav-link-item ${location.pathname === '/news' ? 'active' : ''}`}
        >
            News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;