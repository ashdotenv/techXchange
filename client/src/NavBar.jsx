import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const active = (isActive) => {
    return [
      isActive ? 'font-bold' : '',
      isActive ? 'text-slate-500' : ''
    ].join(' ');
  };

  return (
    <>
      <nav className='flex  gap-5 text-2xl p-2'>
        <NavLink className={(data) => active(data.isActive)} to={"/"}>Home</NavLink>
        <NavLink className={(data) => active(data.isActive)} to={"/signup"}>Signup</NavLink>
        <NavLink className={(data) => active(data.isActive)} to={"/login"}>Login</NavLink>
        <NavLink className={(data) => active(data.isActive)} to={"/user"}>Dashboard</NavLink>
      </nav>
    </>
  );
}

export default NavBar;
