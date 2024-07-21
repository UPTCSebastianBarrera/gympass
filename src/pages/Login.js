// src/pages/Login.js
import React, { useState } from 'react';
import './Login.css';

const mockUserData = {
  username: 'Pedro',
  email: 'pedro@example.com',
  phone: '1234567890',
  address: 'Cll 4a Sur #15',
  profilePic: 'https://via.placeholder.com/50'
};

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/50');

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful login with mock data
    if (username === mockUserData.username) {
      setUserData(mockUserData);
      setIsLoggedIn(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle registration form submission
  };

  return (
    <div className="login-page">
      {!isLoggedIn ? (
        !isRegistering ? (
          <>
            <img className="user-photo" src={profilePic} alt="Profile" />
            <h2 className="user-name">Invitado</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                className="input-field"
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">Login</button>
            </form>
            <button className="register-button" onClick={handleRegisterClick}>Register</button>
          </>
        ) : (
          <>
            <div className="register-header">
              <img className="user-photo" src={profilePic} alt="Profile" />
              <input
                type="file"
                onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))}
              />
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <input
                className="input-field"
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="register-button" type="submit">Finish Registering</button>
            </form>
          </>
        )
      ) : (
        <div className="user-info">
          <img className="user-photo" src={userData.profilePic} alt="Profile" />
          <div className="user-details">
            <h2 className="user-name">{userData.username}</h2>
            <p className="user-address">{userData.address}</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
