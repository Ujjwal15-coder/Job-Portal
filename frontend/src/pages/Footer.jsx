import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white mt-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'>

          {/* Brand */}
          <div>
            <h2 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-3'>Placement Portal</h2>
            <p className='text-gray-400 text-sm sm:text-base'>
              Helping students connect with top companies and achieve their goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-3'>Quick Links</h3>
            <ul className='flex flex-col gap-1 text-gray-400 text-sm sm:text-base'>
              <Link to='/' className="hover:text-white transition">Home</Link>
              <Link to='/companies' className="hover:text-white transition">Companies</Link>
              <Link to='/about' className="hover:text-white transition">About Us</Link>
              <Link to='/contact' className="hover:text-white transition">Contact</Link>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-3'>Contact Us</h3>
            <p className='text-gray-400 text-sm sm:text-base'>Email: ujjwal@gmail.com</p>
            <p className='text-gray-400 text-sm sm:text-base mt-1'>Phone: +91 8303201078</p>
            <p className='text-gray-400 text-sm sm:text-base mt-1'>Address: Ayodhya, India</p>
          </div>

        </div>

        <p className='border-t border-gray-700 mt-6 sm:mt-8 text-center pt-4 text-gray-400 text-xs sm:text-sm'>
          &copy; 2026 Placement Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
