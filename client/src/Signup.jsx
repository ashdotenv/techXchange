import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role:"User"
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
      const response = await fetch('https://techxchange1.onrender/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.message); 
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <form className="w-1/2 p-6 bg-gray-900 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
       Already Have an Account? <Link className='text-blue-400 underline' to={"/Login"}>Login</Link>
      </form>
    </div>
  );
};

export default SignupForm;
