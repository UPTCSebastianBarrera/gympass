// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/gyms" className="navbar-item">
        <img src="Gym.png" width='30px' alt="Gym" />
        <span className='text-navbar-item'>Gimnasios</span>
      </Link>
      <Link to="/products" className="navbar-item">
        <img src="Gym.png" width='30px' alt="Products" />
        <span  className='text-navbar-item' >Productos</span>
      </Link>
      <Link to="/account" className="navbar-item">
        <img src="Gym.png" width='30px' alt="Account" />
        <span  className='text-navbar-item'>Cuenta</span>
      </Link>
    </div>
  );
};

export default NavBar;
