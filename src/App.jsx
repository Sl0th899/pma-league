import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RaceResults from './pages/RaceResults';
import Preloader from './components/layout/Preloader';

function App() {
  // State to track if loading is finished
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Show Preloader if loading is true */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* Show Website only after loading is false */}
      {!loading && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/race/:roundId" element={<RaceResults />} />
              {/* Add other routes here like /news */}
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;