import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import api from '../service/api.js'

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [appliedCompanies, setAppliedCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadProfile(); }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get('/student/me');
            setAppliedCompanies(res.data.student?.appliedCompanies || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => { logout(); navigate('/login'); }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <p className="text-blue-600 text-lg font-semibold">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 sm:py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 sm:p-8 text-white">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg shrink-0">
                                {user?.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold">{user?.name}</h1>
                                <p className="text-blue-200 text-sm sm:text-base">{user?.email}</p>
                                <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                    user?.role === 'admin' ? 'bg-red-400 text-white' : 'bg-green-400 text-white'
                                }`}>
                                    {user?.role || 'student'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                            <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Course</p>
                                <p className="text-gray-800 font-bold text-base sm:text-lg mt-1">{user?.course || 'N/A'}</p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Skills</p>
                                <p className="text-gray-800 font-bold text-base sm:text-lg mt-1 break-words">{user?.skills || 'N/A'}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl transition text-sm sm:text-base"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Applied Companies */}
                <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
                        Applied Companies ({appliedCompanies.length})
                    </h2>

                    {appliedCompanies.length === 0 ? (
                        <div className="text-center py-8 sm:py-10">
                            <p className="text-gray-500 text-base sm:text-lg">You haven't applied to any company yet.</p>
                            <Link to="/companies" className="mt-4 inline-block bg-blue-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition text-sm sm:text-base">
                                Browse Companies
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {appliedCompanies.map((company, idx) => (
                                <div key={company._id || idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 rounded-xl p-4 gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            {company.companyName?.charAt(0) || '?'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{company.companyName || 'Company'}</p>
                                            <p className="text-gray-500 text-xs sm:text-sm">{company.role} &bull; {company.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{company.salaryPackage}</span>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Applied</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
