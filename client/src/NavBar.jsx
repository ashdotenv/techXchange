import React from 'react';
import {  NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className='flex items-center justify-center bg-slate-800 text-xl   text-white gap-5 w-full text-center'>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/signup">Signup</NavLink>
    <NavLink to="/Login">Login</NavLink>
    <NavLink to="/Dashboard">Dashboard</NavLink>
    <NavLink to='/user/updateProduct'>Update Products</NavLink>
    </div>
  
    </>
  );
};

export default Navbar;
