import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.withCredintials=true      
      const response = await axios.post("http://localhost:5000/login", formData);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-96">
        <h2 className="text-3xl mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none focus:bg-gray-800"
            />
          </label>
          <label className="block">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none focus:bg-gray-800"
            />
          </label>
          <button type="submit" className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200">Login</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
