import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/navbar';

// Import Pages
import Home from './pages/home';
import RaceResults from './pages/RaceResults';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import NotFound from './pages/notfound';

function App() {
  return (
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
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;