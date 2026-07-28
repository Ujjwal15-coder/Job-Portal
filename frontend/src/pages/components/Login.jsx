import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import api from '../../service/api.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email.trim()) return setError("Please provide email");
    if (!formData.password.trim()) return setError("Please provide password");

    setLoading(true);
    try {
      const response = await api.post('/student/login', formData);
      setSuccess("Login successful! Redirecting...");
      setError("");
      login(response.data.token, response.data.user);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-4'>
      <div className='bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md'>
        <div className='text-center mb-6 sm:mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-blue-600'>Welcome Back</h1>
          <p className='text-gray-500 mt-1 text-sm sm:text-base'>Login to your Placement Portal account</p>
        </div>

        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm'>
            {success}
          </div>
        )}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm'>
            {error}
          </div>
        )}

        <form className='space-y-4 sm:space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base'>Email</label>
            <input
              type="email"
              placeholder='Enter your email'
              name='email'
              id='login-email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition'
            />
          </div>

          <div>
            <label className='block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base'>Password</label>
            <input
              type="password"
              placeholder='Enter your password'
              name='password'
              id='login-password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition'
            />
          </div>

          <button
            type='submit'
            id='login-submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-center text-gray-500 mt-5 text-sm sm:text-base'>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-600 font-semibold hover:underline'>Register here</Link>
        </p>
      </div>
    </div>
  )
}
