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

  // 2. Dynamic Variables
  const navPadding = isScrolled ? '15px 40px' : '30px 40px';
  const logoSize = isScrolled ? '24px' : '32px';

  return (
    <nav style={{ 
      backgroundColor: 'transparent', /* Completely Transparent */
      padding: navPadding, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'padding 0.4s ease', 
      /* Optional: Add a subtle blur if you want text readable over content */
      backdropFilter: isScrolled ? 'blur(5px)' : 'none'
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
      
      {/* RIGHT: Animated Text Links */}
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
            Home
        </Link>
        
        <Link 
            to="/dashboard" 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
            Dashboard
        </Link>
        
        <Link 
            to="/news" 
            className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}
        >
            News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;