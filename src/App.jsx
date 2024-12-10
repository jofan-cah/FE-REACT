import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/HomePage";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ProfileDetail from "./components/ProfileDetail";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Cek token

  useEffect(() => {
    // Fungsi untuk menangani perubahan status login secara manual
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Mengecek status login saat komponen pertama kali dimuat
    checkLoginStatus();
  }, []); // Empty dependency array untuk hanya dijalankan sekali

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileDetail />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
