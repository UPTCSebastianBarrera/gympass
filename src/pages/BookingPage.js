import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const { gym } = location.state;
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleGenerateQR = () => {
    if (!fullName || !birthDate || !idNumber) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const bookingInfo = {
      gym: gym.name,
      fullName,
      birthDate,
      idNumber,
    };
    setQrCode(JSON.stringify(bookingInfo));
    setError('');
  };

  return (
    <div className="booking-container">
      <h3>Reservar en {gym.name}</h3>
      <input
        type="text"
        placeholder="Nombre completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Fecha de nacimiento"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cedula"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleGenerateQR}>Generar QR</button>
      {qrCode && <div className="qr-code"><QRCode value={qrCode} /></div>}
    </div>
  );
};

export default BookingPage;
