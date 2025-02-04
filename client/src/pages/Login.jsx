import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 -mt-20 pt-0">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-black mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Email"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-black mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="******************"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white rounded-full bg-green-600"
            >
              Login
            </button>

            <div className="text-center text-sm text-black">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 align-baseline hover:text-blue-800">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;