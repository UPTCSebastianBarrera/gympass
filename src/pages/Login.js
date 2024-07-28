import React, { useState } from 'react';
import './Login.css';

const Login = ({ isLoggedIn, userData, handleLoginSubmit, handleLogout, handleRegisterSubmit }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailOrName, setEmailOrName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('https://via.placeholder.com/50');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(emailOrName, password);
    setEmailOrName('');
    setPassword('');
  };
  
  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert('La contraseña debe tener un minimo de 8 y maximo de 32 caracteres, debe contener por lo menos una letra mayuscula, una letra minuscula, un numero y un caracter especial.');
      return;
    }
    if (password !== confirmPassword) {
      alert('La contraseñas no coinciden.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Email debe tener como dominio @gmail.com o @uptc.edu.co.');
      return;
    }
    handleRegisterSubmit({ name: emailOrName, email, password, address, phone, profilePicture: profilePic });
    setEmailOrName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPassword('');
    setConfirmPassword('');
    setProfilePic(null);
    setProfilePicPreview('https://via.placeholder.com/50');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|uptc\.edu\.co)$/;
    return regex.test(email);
  };

  return (
    <div className="login-page">
      {!isLoggedIn ? (
        !isRegistering ? (
          <>
            <form onSubmit={onLoginSubmit}>
              <input
                className="input-field"
                type="text"
                placeholder="Nombre de Usuario o Correo"
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
              />
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="show-password">
                <input
                  
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Mostrar Contraseña
              </label>
              <button className="login-button" type="submit">Ingresar</button>
              <button className="register-button" onClick={handleRegisterClick}>Registrarse</button>
            </form>
            
          </>
        ) : (
          <>
            <div className="register-header">
              <img className="user-photo" src={profilePicPreview} alt="Profile" />
              <input type="file" onChange={handleProfilePicChange} />
            </div>
            <form onSubmit={onRegisterSubmit}>
              <input
                className="input-field"
                type="text"
                placeholder="Nombre de Usuario"
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Telefono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="input-field"
                type="email"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="show-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Mostrar Contraseña
              </label>
              <button className="register-button" type="submit">Registrarse</button>
            </form>
          </>
        )
      ) : (
        <div className="user-info">
          <button className="logout-button" onClick={handleLogout}>Salir</button>
        </div>
      )}
    </div>
  );
};

export default Login;
