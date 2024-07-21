// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';
import Login from './pages/Login';
import Map from './pages/Map';
import Market from './pages/Market';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/gyms" element={<Map />} />
          <Route path="/products" element={<Market />} />
          <Route path="/account" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
