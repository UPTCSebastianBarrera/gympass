import React, { useState } from 'react';
import './Login.css';

const Login = ({ isLoggedIn, userData, handleLoginSubmit, handleLogout, handleRegisterSubmit }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailOrName, setEmailOrName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('https://via.placeholder.com/50');

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(emailOrName, password);
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit({ name: emailOrName, email, password, address, phone, profilePicture: profilePic });
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

  return (
    <div className="login-page">
      {!isLoggedIn ? (
        !isRegistering ? (
          <>
            <form onSubmit={onLoginSubmit}>
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
              <img className="user-photo" src={profilePicPreview} alt="Profile" />
              <input type="file" onChange={handleProfilePicChange} />
            </div>
            <form onSubmit={onRegisterSubmit}>
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
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
