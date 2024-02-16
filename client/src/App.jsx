import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routing from './utils/Routing'
import Navbar from './Navbar'

function App() {

  return (
    <>
    
       <Navbar/>
     <Routing/>
    
    </>
  )
}

export default App
