import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Home'
const Routing = () => {
  return (
        <>
        <Routes>
            <Route Component={Home} path='/'></Route>
        </Routes>
        </>
  )
}

export default Routing