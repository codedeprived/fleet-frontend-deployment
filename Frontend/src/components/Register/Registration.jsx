import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    license_number: '',
    password: '',
    reenter_password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/driver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Registration successful! Redirecting to login...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed. Please try again.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/public/istockphoto-1500466535-1024x1024.jpg')` }}
    >
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Glassy Registration Form */}
      <div className="relative z-10 text-center text-white bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-30 max-w-md w-full">
        <header className="text-4xl font-bold mb-6">Register</header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">License Number</label>
            <input
              type="text"
              name="license_number"
              placeholder="Enter your license number"
              value={formData.license_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Re-enter Password</label>
            <input
              type="password"
              name="reenter_password"
              placeholder="Re-enter your password"
              value={formData.reenter_password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-md hover:bg-gradient-to-br focus:outline-none"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-300 hover:underline mt-4 block"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
