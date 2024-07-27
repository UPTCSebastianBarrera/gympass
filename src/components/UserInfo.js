import React from 'react';
import './UserInfo.css';

const UserInfo = ({ userData }) => {
  return (
    <div className="user-info">
      <img className="user-photo" src={userData.profilePicture} alt="Profile" />
      <h2 className="user-name">{userData.name}</h2>
    </div>
  );
};

export default UserInfo;
