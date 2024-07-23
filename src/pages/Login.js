// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [emailOrName, setEmailOrName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/50');

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        emailOrName,
        password,
      });
      console.log(response.data); // Log the response data
      setUserData(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message); // Log the error
      alert('Invalid email/name or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmailOrName('');
    setPassword('');
    setUserData({});
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name: emailOrName,
        email,
        password,
        address,
        phone,
        profilePicture: profilePic
      });
      console.log(response.data); // Log the response
      if (response.status === 201) {
        alert('User registered successfully!');
        setIsRegistering(false);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message); // Log the error
      alert('Error registering user');
    }
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
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
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
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
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
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="register-button" type="submit">Finish Registering</button>
            </form>
          </>
        )
      ) : (
        <div className="user-info">
          <img className="user-photo" src={userData.profilePicture} alt="Profile" />
          <div className="user-details">
            <h2 className="user-name">{userData.name}</h2>
            <p className="user-address">{userData.address}</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
