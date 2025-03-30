import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Destructure logout and isAuthenticated

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from local storage
    logout(); // Update isAuthenticated to false
    navigate('/'); // Redirect to landing page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">Fleet Manager</h1>
        
        {/* Hamburger Icon for Small Screens */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Links for Desktop */}
        <ul className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/trip" className="hover:text-blue-200 transition">
                  Trip
                </Link>
              </li>
              <li>
                <Link to="/maintenance" className="hover:text-blue-200 transition">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-blue-200 transition"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registration" className="hover:text-blue-200 transition">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Dropdown Links for Mobile */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 text-center bg-blue-700 p-4 rounded-lg">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/trip"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={toggleMenu}
                >
                  Trip
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={toggleMenu}
                >
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/registration"
                  className="block text-white hover:text-blue-300 transition"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};


export default Navbar;
