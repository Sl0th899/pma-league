import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
    <h1 style={{ fontSize: '80px', margin: 0, color: 'var(--accent)' }}>404</h1>
    <p>You went off track!</p>
    <Link to="/" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Return to Pit Lane</Link>
  </div>
);
export default NotFound;