import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome3Line, RiDashboardLine } from 'react-icons/ri';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0   w-full z-10 bg-black text-white p-4 flex items-center justify-between">
      {/* Logo/Home */}
      <div>
        <NavLink to="/" className="flex items-center text-2xl" activeClassName="text-blue-300">
          <RiHome3Line className="mr-1" />
          Home
        </NavLink>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <div className="relative">
          <input
            type="text"
            className="bg-gray-700 text-white rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FiSearch />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="text-xl flex space-x-4">
        <NavLink to="/dashboard" className="flex items-center hover:text-sky-500" activeClassName="text-blue-300">
          <RiDashboardLine className="mr-1" />
          Dashboard
        </NavLink>
        <NavLink to="/login" className="flex items-center hover:text-sky-500" activeClassName="text-blue-300">
          <FaSignInAlt className="mr-1" />
          Login
        </NavLink>
        <NavLink to="/signup" className="flex items-center hover:text-sky-500" activeClassName="text-blue-300">
          <FaUserPlus className="mr-1" />
          Signup
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
