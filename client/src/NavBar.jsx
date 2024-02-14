import React from 'react';
import { NavLink } from 'react-router-dom';

// Function to generate styles based on isActive
const getNavLinkStyles = (isActive) => ({
  color: isActive ? "red" : ""
});

function NavBar() {
  return (
    <>
      <div className='flex text-white justify-center gap-5' >
        <NavLink
          activeClassName='active'
          to="/signup"
          style={(data) => getNavLinkStyles(data.isActive)}
        >
          Signup
        </NavLink>
        <NavLink
          activeClassName='active'
          to="/login"
          style={(data) => getNavLinkStyles(data.isActive)}
        >
          Login
        </NavLink>
        <NavLink
          activeClassName='active'
          to="/user/dashboard"
          style={(data) => getNavLinkStyles(data.isActive)}
        >
          Dashboard
        </NavLink>
      </div>
    </>
  )
}

export default NavBar;
