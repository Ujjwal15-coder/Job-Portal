import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-blue-600 text-white shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Brand */}
        <Link to="/">
          <h1 className='text-2xl font-bold cursor-pointer tracking-wide'>Placement Portal</h1>
        </Link>

        {/* Desktop Nav Links */}
        <ul className='hidden md:flex gap-8 font-medium items-center'>
          <Link to='/' className='hover:text-yellow-300 transition'>Home</Link>
          <Link to='/companies' className='hover:text-yellow-300 transition'>Companies</Link>
          <Link to='/about' className='hover:text-yellow-300 transition'>About Us</Link>
          <Link to='/contact' className='hover:text-yellow-300 transition'>Contact</Link>
        </ul>

        {/* Auth Buttons */}
        <div className='hidden md:flex gap-3 items-center'>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-50 transition'>
                {user?.name?.split(' ')[0] || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/register' className='border border-white rounded-lg px-4 py-2 hover:bg-blue-500 transition font-medium'>
                Register
              </Link>
              <Link to='/login' className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-50 transition'>
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className='md:hidden text-xl font-bold'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'X' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='md:hidden bg-blue-700 px-6 pb-4 flex flex-col gap-3 font-medium'>
          <Link to='/' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Home</Link>
          <Link to='/companies' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Companies</Link>
          <Link to='/about' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>About Us</Link>
          <Link to='/contact' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Contact</Link>
          {isLoggedIn ? (
            <>
              <Link to='/profile' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Profile</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className='text-left text-red-300 hover:text-red-100'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/register' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Register</Link>
              <Link to='/login' onClick={() => setMenuOpen(false)} className='hover:text-yellow-300'>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
