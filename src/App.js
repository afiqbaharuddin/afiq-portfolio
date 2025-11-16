import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ServicesPage from './components/ServicesPage';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
