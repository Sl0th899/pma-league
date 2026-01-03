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
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            Home
        </Link>
        
        {/* NEW TAB */}
        <Link to="/calendar" className={`nav-item ${location.pathname === '/calendar' ? 'active' : ''}`}>
            Calendar
        </Link>
        
        {/* RENAMED TAB */}
        <Link to="/championship" className={`nav-item ${location.pathname === '/championship' ? 'active' : ''}`}>
            Championship
        </Link>
        
        <Link to="/news" className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}>
            News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;