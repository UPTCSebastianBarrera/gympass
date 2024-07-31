// src/pages/ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Contraseñas no coinciden');
      return;
    }

    try {
      await axios.post(`https://gympass-backend.vercel.app/api/users/reset-password/${token}`, { password });
      setMessage('Contraseña actualizada');
    } catch (error) {
      setMessage('Error al actualizar contraseña');
    }
  };

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Resetear contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
