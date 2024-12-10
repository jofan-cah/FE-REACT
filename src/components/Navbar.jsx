import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa apakah ada token di localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dan set state login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect ke login setelah logout
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home Link */}
        <div>
          <Link
            to="/"
            className="text-white font-extrabold text-xl tracking-wide hover:scale-105 transition transform duration-300"
          >
            MyApp
          </Link>
        </div>

        {/* Navigation Links */}
        <div>
          {isLoggedIn ? (
            <div className="flex space-x-6 items-center">
              <Link
                to="/dashboard"
                className="text-white text-sm font-medium hover:text-blue-200 transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-white text-sm font-medium hover:text-blue-200 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-6 items-center">
              <Link
                to="/login"
                className="text-white text-sm font-medium hover:text-blue-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg border border-white hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
