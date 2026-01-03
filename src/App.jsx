import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/navbar'; // Make sure this matches your actual filename (Navbar.jsx)

// Import Pages
import Home from './pages/Home';
import RaceResults from './pages/RaceResults';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import NotFound from './pages/NotFound'; // Ensure this file exists, or remove the route if not

// Import Preloader
import Preloader from './components/layout/preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 1. Show Preloader if loading is true */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* 2. Show Main Site only after loading finishes */}
      {!loading && (
        <Router>
          {/* Navbar sits outside Routes so it's visible on EVERY page */}
          <Navbar />
          
          {/* The main content area */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/race/:roundId" element={<RaceResults />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/news" element={<News />} />
              
              {/* Error Handling */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;