import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInfo";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Market from "./pages/Market";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage"; 
import "./App.css";

const fetchUserDataFromLocalStorage = () => {
  const storedUserData = localStorage.getItem("userData");
  return storedUserData
    ? JSON.parse(storedUserData)
    : {
        name: "Invitado",
        profilePicture: "https://via.placeholder.com/50",
        address: "N/A",
      };
};

const App = () => {
  const [userData, setUserData] = useState(fetchUserDataFromLocalStorage());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = async (emailOrName, password) => {
    try {
      const response = await axios.post(
        "https://gympass-backend.vercel.app/api/users/login",
        { emailOrName, password }
      );
      const data = response.data;
      const isAdmin = data.email === "administrador@gmail.com";
      setUserData({ ...data, isAdmin });
      setIsLoggedIn(true);
      localStorage.setItem("userData", JSON.stringify({ ...data, isAdmin }));
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Invalid email/name or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: "Invitado",
      profilePicture: "https://via.placeholder.com/50",
      address: "N/A",
      isAdmin: false,
    });
    localStorage.removeItem("userData");
  };

  const handleRegisterSubmit = async (userDetails) => {
    try {
      const response = await axios.post(
        "https://gympass-backend.vercel.app/api/users",
        userDetails
      );
      const data = response.data;
      if (response.status === 201) {
        alert("User registered successfully!");
        setUserData(data);
        setIsLoggedIn(true);
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Error registering user");
    }
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
                isLoggedIn && userData.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/account" />
                )
              }
            />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<Navigate to="/gyms" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
