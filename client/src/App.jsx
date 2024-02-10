import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import Home from './Home';
import NavBar from './NavBar';
import Routing from './utils/Routing';
function App() {
  return (
    <>
    <div className='w-5/6 bg-white  m-auto h-full'>
      <NavBar/>
    <Routing/>
    </div>
    </>
  );
}

export default App;
