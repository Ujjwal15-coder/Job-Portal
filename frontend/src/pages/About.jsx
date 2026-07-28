import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-14 sm:py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4'>About Us</h1>
          <p className='text-blue-100 text-base sm:text-xl max-w-2xl mx-auto'>
            We connect students with their dream careers at top companies across India.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
          <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-blue-600 mb-3'>Our Mission</h2>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              To bridge the gap between talented students and top-tier companies by providing a seamless placement experience. We strive to empower every student with the opportunity to achieve their career goals.
            </p>
          </div>
          <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-indigo-600 mb-3'>Our Vision</h2>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              To become India's most trusted placement portal, known for transparency, efficiency, and connecting the right talent with the right opportunity.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 sm:mt-10'>
          {[
            { label: 'Students Placed', value: '500+' },
            { label: 'Partner Companies', value: '50+' },
            { label: 'Highest Package', value: '25 LPA' },
          ].map((stat) => (
            <div key={stat.label} className='bg-white rounded-2xl shadow p-5 sm:p-6 text-center'>
              <p className='text-2xl sm:text-3xl font-bold text-blue-600'>{stat.value}</p>
              <p className='text-gray-500 text-xs sm:text-sm mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className='text-center mt-10 sm:mt-12'>
          <Link to='/companies' className='bg-blue-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base inline-block'>
            Browse Companies
          </Link>
        </div>
      </section>

    </div>
  )
}
