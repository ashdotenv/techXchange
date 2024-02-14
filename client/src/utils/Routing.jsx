import { Routes,Route,Link } from "react-router-dom";
import React from 'react'
import Signup from "@/Signup";
import Login from "@/Login";
import Dashboard from "@/Dashboard";

function Routing() {
  return (
    <>
    <Routes >
        <Route path="/"  >Home</Route>
        <Route path="/signup" Component={Signup} ></Route>
        <Route path="/login" Component={Login} ></Route>
        <Route path="/user/dashboard" Component={Dashboard} ></Route>
    </Routes>
    </>
  )
}

export default Routing
