import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../Home'
import Login from '../Login'
import Signup from '../Signup'
import Dashboard from '../Dashboard'
import UpdateProduct from '../UpdateProduct'
function Routing() {
    
  return (
        <>
        <Routes>
            <Route Component={Home} path='/'></Route>
            <Route Component={Login} path='/login'></Route>
            <Route Component={Signup} path='/signup'></Route>
            <Route Component={Dashboard} path='/dashboard'></Route>
            <Route Component={UpdateProduct} path='/user/updateProduct'></Route>
        </Routes>
        </>    
  )
}

export default Routing