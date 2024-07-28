// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// En NavBar.js
const NavBar = ({ isAdmin }) => {
  return (
    <div className="navbar">
      <Link to="/gyms" className="navbar-item">
        <div className="image-container">
          <img src="Gym.png" width="30px" alt="Gym" />
        </div>
        <span className="text-navbar-item">Gimnasios</span>
      </Link>
      <Link to="/products" className="navbar-item">
        <div className="image-container">
          <img src="Market.png" width="30px" alt="Products" />
        </div>
        <span className="text-navbar-item">Productos</span>
      </Link>
      {isAdmin && (
        <Link to="/admin" className="navbar-item">
          <div className="image-container">
            <img src="admin.png" width="30px" alt="Admin" />
          </div>
          <span className="text-navbar-item">Admin</span>
        </Link>
      )}
      <Link to="/account" className="navbar-item">
        <div className="image-container">
          <img src="User.png" width="30px" alt="Account" />
        </div>
        <span className="text-navbar-item">Cuenta</span>
      </Link>
    </div>
  );
};

export default NavBar;
