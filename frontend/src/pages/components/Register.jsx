import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import api from '../../service/api.js';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", course: "", skills: "", role: "student"
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("");
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Please provide your full name";
    if (!formData.email.trim()) return "Please provide your email";
    if (!formData.password.trim()) return "Please provide a password";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (!formData.course.trim()) return "Please provide your course";
    if (!formData.skills.trim()) return "Please provide your skills";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      await api.post('/student/register', formData)
      setSuccess("Registration successful! Redirecting to login...")
      setError("")
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setSuccess("")
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 outline-none transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

        {/* Registration Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
          <div className='text-center mb-5 sm:mb-6'>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Student Registration</h1>
            <p className='text-gray-500 text-sm mt-1'>Create your Placement Portal account</p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Full Name</label>
              <input type="text" name="name" id="reg-name" placeholder="Enter Full Name"
                value={formData.name} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Email</label>
              <input type="email" name="email" id="reg-email" placeholder="Enter Email"
                value={formData.email} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Password</label>
              <input type="password" name="password" id="reg-password" placeholder="Enter Password (min 6 chars)"
                value={formData.password} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Course</label>
              <input type="text" name="course" id="reg-course" placeholder="e.g. B.Tech Computer Science"
                value={formData.course} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Skills</label>
              <input type="text" name="skills" id="reg-skills" placeholder="React, Node.js, MongoDB..."
                value={formData.skills} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base">Role</label>
              <input type="text" value={formData.role} readOnly
                className="w-full border rounded-xl p-2.5 sm:p-3 bg-gray-100 cursor-not-allowed text-gray-500 text-sm sm:text-base" />
            </div>

            <button type="submit" id="reg-submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition text-sm sm:text-base">
              {loading ? 'Registering...' : 'Register Student'}
            </button>
          </form>

          <p className='text-center text-gray-500 mt-5 text-sm sm:text-base'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 font-semibold hover:underline'>Login here</Link>
          </p>
        </div>

        {/* Live Preview - hidden on small, shown on md+ */}
        <div className="hidden md:flex bg-white shadow-2xl rounded-2xl p-8 flex-col">
          <div className='text-center mb-6'>
            <h2 className="text-2xl font-bold text-green-600">Live Preview</h2>
            <p className='text-gray-500 text-sm'>Your profile card preview</p>
          </div>

          <div className='flex-1 bg-gray-50 rounded-2xl p-6 space-y-3 border border-gray-100'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shrink-0'>
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className='min-w-0'>
                <p className='font-bold text-lg text-gray-800 truncate'>{formData.name || 'Your Name'}</p>
                <p className='text-gray-500 text-sm truncate'>{formData.email || 'your@email.com'}</p>
              </div>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between bg-white rounded-lg px-4 py-2 border border-gray-100'>
                <span className='text-gray-500 font-medium'>Course</span>
                <span className='font-semibold text-gray-800 text-right max-w-[160px] truncate'>{formData.course || '-'}</span>
              </div>
              <div className='flex justify-between bg-white rounded-lg px-4 py-2 border border-gray-100'>
                <span className='text-gray-500 font-medium'>Skills</span>
                <span className='font-semibold text-gray-800 text-right max-w-[160px] truncate'>{formData.skills || '-'}</span>
              </div>
              <div className='flex justify-between bg-white rounded-lg px-4 py-2 border border-gray-100'>
                <span className='text-gray-500 font-medium'>Role</span>
                <span className='bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase'>{formData.role}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
