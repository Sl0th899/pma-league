import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RaceResults from './pages/RaceResults';

// Placeholder Home component (we can build a real dashboard later)
const Home = () => (
  <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>
    <h1>Welcome to PMA League Dashboard</h1>
    <p>Select a round:</p>
    <a href="/race/s1-r1" style={{color: '#e10600', fontWeight:'bold', fontSize:'20px'}}>View Round 1 (Australia)</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* This :roundId is the magic part that lets us switch rounds dynamically */}
        <Route path="/race/:roundId" element={<RaceResults />} />
        
        {/* Catch all 404s and send home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;