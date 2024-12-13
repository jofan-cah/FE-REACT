import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const username = localStorage.getItem('username') || 'User Name';
  const profileImage = localStorage.getItem('profileImage') || 'https://via.placeholder.com/150';

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-white font-bold text-xl tracking-wide hover:scale-105 transition-transform transform"
        >
          My Dashboard
        </Link>



        {/* Authentication Buttons */}
        <div className="relative">
          {isLoggedIn ? (
            <div>
              {/* Dropdown Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white bg-indigo-600 px-4 py-2 rounded-lg focus:outline-none hover:bg-indigo-700 transition duration-300"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="hidden sm:block font-semibold"></span>
                <svg
                  className="w-4 h-4 ml-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-lg">{username}</p>
                      <p className="text-sm text-gray-500">@{username.toLowerCase()}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white px-4 py-2 rounded-lg bg-indigo-500 hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="block sm:hidden text-white text-2xl"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
