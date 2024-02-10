import { Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "../Home";
import SignUp from "../Signup";
import Login from "../Login";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Routing;
