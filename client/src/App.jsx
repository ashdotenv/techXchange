import { useState } from 'react';
import Navbar from './Navbar';
import Routing from './utils/Routing';

function App() {
  return (
    <div className="pt-[75px]"> 
      <Navbar/> 
      <Routing/>
    </div>
  );
}

export default App;
