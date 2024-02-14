import axios from 'axios';
import React from 'react';

const Dashboard = () => {
  async function getData() {
    let a= axios.get("https://techxchange1.onrender.com/user/dashboard")
    let b= await a
    console.log(b.json());
    
  }
  
  getData();

  return (
    <div>
      <h1>Dashboard Component</h1>
      {/* Add your dashboard content here if needed */}
    </div>
  );
};

export default Dashboard;
