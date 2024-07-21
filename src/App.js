// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Map from './pages/Map';
import Market from './pages/Market';
import './App.css'; // Add this line to import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/gyms" element={<Map />} />
            <Route path="/products" element={<Market />} />
            <Route path="/account" element={<Login />} />
            <Route path="*" element={<Navigate to="/gyms" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
