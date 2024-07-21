// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/gyms">Gimnasios</Link>
      <Link to="/products">Productos</Link>
      <Link to="/account">Cuenta</Link>
    </div>
  );
};

export default NavBar;
