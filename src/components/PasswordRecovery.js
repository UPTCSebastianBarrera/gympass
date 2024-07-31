import React, { useState } from 'react';
import axios from 'axios';
import './PasswordRecovery.css';

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`https://gympass-backend.vercel.app/api/users/recover`, { email });
      setMessage('Email de recuperacion de contraseña enviado.');
    } catch (error) {
      setMessage('Error al enviar el email.');
    }
  };

  return (
    <div className="password-recovery">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Recuperar contraseña</button>
      </form>
      {message && <p>{message}</p>}
      <button type="button" onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default PasswordRecovery;
