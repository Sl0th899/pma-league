import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/navbar';

// Import Pages
import Home from './pages/Home';
import RaceResults from './pages/RaceResults';
import Dashboard from './pages/Dashboard'; // Keeping filename same, just route changes
import Calendar from './pages/Calendar';   // Import New Page
import News from './pages/News';
import NotFound from './pages/NotFound';
import Preloader from './components/layout/preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {!loading && (
        <Router>
          <Navbar />
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/race/:roundId" element={<RaceResults />} />
              
              {/* NEW CALENDAR ROUTE */}
              <Route path="/calendar" element={<Calendar />} />
              
              {/* RENAMED CHAMPIONSHIP ROUTE (Still uses Dashboard.jsx) */}
              <Route path="/championship" element={<Dashboard />} />
              
              <Route path="/news" element={<News />} />
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