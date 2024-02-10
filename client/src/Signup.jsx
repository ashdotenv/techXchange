// src/components/SignUpForm.jsx

import axios from 'axios';
import React, { useState } from 'react';


const SignUpForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      role: 'User',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://techxchange1.onrender.com/signup', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };

  return (
    <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
