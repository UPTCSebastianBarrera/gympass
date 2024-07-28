import React from 'react';
import GymCRUD from '../components/GymCRUD';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administrador</h1>
      <GymCRUD />
    </div>
  );
};

export default AdminDashboard;