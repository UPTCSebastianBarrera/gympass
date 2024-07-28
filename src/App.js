import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInfo";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Market from "./pages/Market";
import AdminDashboard from "./pages/AdminDashboard";
import {
  fetchUserDataFromLocalStorage,
  loginUser,
  logoutUser,
  registerUser,
} from "./services/App/userAuth";
import "./App.css";

const App = () => {
  const [userData, setUserData] = useState(fetchUserDataFromLocalStorage());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = async (emailOrName, password) => {
    await loginUser(emailOrName, password, setUserData, setIsLoggedIn);
  };

  const handleLogout = () => {
    logoutUser(setUserData, setIsLoggedIn);
  };

  const handleRegisterSubmit = async (userDetails) => {
    await registerUser(userDetails, setUserData, setIsLoggedIn);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="App">
          <UserInfo userData={userData} />
          <NavBar isAdmin={userData.isAdmin} />
          <Routes>
            <Route path="/gyms" element={<Map />} />
            <Route path="/products" element={<Market />} />
            <Route
              path="/account"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  handleLoginSubmit={handleLoginSubmit}
                  handleLogout={handleLogout}
                  handleRegisterSubmit={handleRegisterSubmit}
                />
              }
            />
            <Route 
              path="/admin" 
              element={
                isLoggedIn && userData.isAdmin ? <AdminDashboard /> : <Navigate to="/account" />
              } 
            />
            <Route path="*" element={<Navigate to="/gyms" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;