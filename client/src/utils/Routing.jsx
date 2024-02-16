import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../Home'
import Login from '../Login'
import Signup from '../Signup'
import Dashboard from '../Dashboard'
function Routing() {
    
  return (
        <>
        <Routes>
            <Route Component={Home} path='/'></Route>
            <Route Component={Login} path='/login'></Route>
            <Route Component={Signup} path='/signup'></Route>
            <Route Component={Dashboard} path='/dashboard'></Route>
        </Routes>
        </>    
  )
}

export default Routing