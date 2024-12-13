import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  // Utility function to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:translate-x-0 sm:static sm:w-48 shadow-lg flex flex-col justify-between`}  // Use flexbox and justify-between
    >
      {/* Close Button (Mobile Only) */}
      <button
        className="block sm:hidden text-white text-2xl mb-4 focus:outline-none"
        onClick={closeSidebar}
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Sidebar Title */}
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-3">
        Menu
      </h2>

      {/* Menu Items */}
      <ul className="space-y-4 flex-grow">
        <li>
          <Link
            to="/dashboard"
            className={`block p-3 rounded-lg transition-all duration-300 ${isActive('/dashboard')
              ? 'bg-indigo-600 text-white shadow-md'
              : 'hover:bg-gray-700'
              }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`block p-3 rounded-lg transition-all duration-300 ${isActive('/profile')
              ? 'bg-indigo-600 text-white shadow-md'
              : 'hover:bg-gray-700'
              }`}
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
