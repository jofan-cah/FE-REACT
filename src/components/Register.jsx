import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika berhasil, arahkan ke halaman login
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred, please try again later');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
