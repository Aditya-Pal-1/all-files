import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BuilderPage from './components/BuilderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder/:projectId" element={<BuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;