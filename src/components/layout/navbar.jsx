import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper to check if the link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '40px 0', 
      backgroundColor: 'transparent', 
      zIndex: 100,
      position: 'relative'
    }}>
      <style>{`
        /* --- FONT DEFINITION --- */
        @font-face {
            font-family: 'Moret';
            /* Pointing to the .otf file as requested */
            src: url('/fonts/Moret-Regular.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
        }

        .nav-link {
            text-decoration: none;
            /* CHANGED FONT HERE */
            font-family: 'Moret', sans-serif; 
            font-size: 24px; 
            color: #666; /* Muted grey for inactive items */
            text-transform: uppercase;
            margin: 0 35px; /* Spacing between links */
            position: relative;
            transition: color 0.3s ease;
            letter-spacing: 0.5px;
            font-weight: bold;
        }

        .nav-link:hover {
            color: white;
        }

        .nav-link.active {
            color: white;
        }

        /* The Red Underline for Active State */
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--accent, #e10600); /* Fallback to red if variable missing */
            box-shadow: 0 2px 10px rgba(225, 6, 0, 0.4);
        }
      `}</style>

      <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
        Home
      </Link>
      <Link to="/calendar" className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}>
        Calendar
      </Link>
      <Link to="/championship" className={`nav-link ${isActive('/championship') ? 'active' : ''}`}>
        Championship
      </Link>
      <Link to="/news" className={`nav-link ${isActive('/news') ? 'active' : ''}`}>
        News
      </Link>
    </nav>
  );
};

export default Navbar;