import React from 'react'
import Company from './components/Company'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
    const { isLoggedIn, user } = useAuth();

    return (
        <>
            {/* Hero Section */}
            <section className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 md:py-24'>
                <div className='max-w-7xl mx-auto text-center px-4 sm:px-6'>
                    <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight'>
                        Welcome to <br />
                        <span className='text-yellow-300'>Placement Portal</span>
                    </h1>
                    <p className='text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-10 max-w-2xl mx-auto'>
                        Helping students land their dream jobs at top companies. Explore opportunities and take the next step in your career.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
                        {!isLoggedIn ? (
                            <>
                                <Link to='/register' className='bg-yellow-400 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-yellow-300 transition text-base sm:text-lg shadow-lg'>
                                    Register Now
                                </Link>
                                <Link to='/companies' className='bg-white text-blue-600 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-blue-50 transition text-base sm:text-lg shadow-lg'>
                                    View Companies
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/companies' className='bg-yellow-400 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-yellow-300 transition text-base sm:text-lg shadow-lg'>
                                    Browse Companies
                                </Link>
                                <Link to='/profile' className='bg-white text-blue-600 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-blue-50 transition text-base sm:text-lg shadow-lg'>
                                    My Profile
                                </Link>
                            </>
                        )}
                    </div>
                    {isLoggedIn && (
                        <p className='mt-5 text-blue-200 text-sm sm:text-base'>
                            Welcome back, <span className='font-bold text-yellow-300'>{user?.name}</span>!
                        </p>
                    )}
                </div>
            </section>

            {/* Statistics Section */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16'>
                <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-gray-800'>Placement Statistics</h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
                    <div className='bg-white shadow-lg p-6 sm:p-8 rounded-2xl text-center border border-blue-100 hover:shadow-xl transition'>
                        <h3 className='text-3xl sm:text-4xl font-bold text-blue-600'>500+</h3>
                        <p className='mt-2 text-gray-600 font-medium'>Students Placed</p>
                    </div>
                    <div className='bg-white shadow-lg p-6 sm:p-8 rounded-2xl text-center border border-green-100 hover:shadow-xl transition'>
                        <h3 className='text-3xl sm:text-4xl font-bold text-green-600'>50+</h3>
                        <p className='mt-2 text-gray-600 font-medium'>Companies Visited</p>
                    </div>
                    <div className='bg-white shadow-lg p-6 sm:p-8 rounded-2xl text-center border border-purple-100 hover:shadow-xl transition'>
                        <h3 className='text-3xl sm:text-4xl font-bold text-purple-600'>25 LPA</h3>
                        <p className='mt-2 text-gray-600 font-medium'>Highest Package</p>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <Company />

            {/* CTA Section */}
            {!isLoggedIn && (
                <section className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-16'>
                    <div className='max-w-3xl mx-auto text-center px-4 sm:px-6'>
                        <h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>Ready to Start Your Career?</h2>
                        <p className='text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base'>Join thousands of students who found their dream jobs through our portal.</p>
                        <Link to='/register' className='bg-yellow-400 text-gray-900 font-bold px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl hover:bg-yellow-300 transition text-base sm:text-lg inline-block'>
                            Get Started for Free
                        </Link>
                    </div>
                </section>
            )}
        </>
    )
}
