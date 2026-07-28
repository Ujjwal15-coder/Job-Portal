import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../service/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function CompaniesDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user, fetchMe } = useAuth();

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => { fetchCompany(); }, [id]);

    const fetchCompany = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/company/${id}`);
            setCompany(res.data.company);
        } catch (err) {
            console.error("Failed to fetch company:", err.message);
        } finally {
            setLoading(false);
        }
    }

    const hasApplied = user?.appliedCompanies?.some(
        (c) => (typeof c === 'object' ? c._id === id : c === id)
    );

    const handleApply = async () => {
        if (!isLoggedIn) { navigate('/login'); return; }
        setApplying(true);
        try {
            await api.post(`/company/apply/${id}`);
            setMessage({ text: "Successfully applied! Good luck!", type: "success" });
            await fetchMe();
            fetchCompany();
        } catch (err) {
            setMessage({ text: err.response?.data?.message || "Failed to apply", type: "error" });
        } finally {
            setApplying(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <p className="text-gray-500 text-base sm:text-lg">Loading company details...</p>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Company not found</h2>
                    <button onClick={() => navigate('/companies')} className="mt-4 text-blue-600 hover:underline text-sm sm:text-base">
                        Back to Companies
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 sm:py-12 px-4">
            <div className="max-w-3xl mx-auto">

                <button
                    onClick={() => navigate('/companies')}
                    className="mb-4 sm:mb-6 text-blue-600 hover:text-blue-800 font-medium transition text-sm sm:text-base"
                >
                    &larr; Back to Companies
                </button>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 sm:p-8 text-white">
                        <div className="flex items-center gap-3 sm:gap-5">
                            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-2xl sm:text-4xl font-bold shadow-lg shrink-0">
                                {company.companyName?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-3xl font-bold truncate">{company.companyName}</h1>
                                <p className="text-blue-200 mt-0.5 text-sm sm:text-base">{company.role}</p>
                                <span className="inline-block mt-1 sm:mt-2 bg-green-400 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                                    Actively Hiring
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 sm:p-8">
                        {message.text && (
                            <div className={`mb-5 px-4 py-3 rounded-xl font-medium text-sm sm:text-base ${
                                message.type === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-700'
                                    : 'bg-red-50 border border-red-200 text-red-700'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                            <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Job Role</p>
                                <p className="text-gray-800 font-bold text-sm sm:text-lg mt-1">{company.role}</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Salary Package</p>
                                <p className="text-gray-800 font-bold text-sm sm:text-lg mt-1">{company.salaryPackage}</p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Location</p>
                                <p className="text-gray-800 font-bold text-sm sm:text-lg mt-1">{company.location}</p>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-3 sm:p-4">
                                <p className="text-gray-500 text-xs sm:text-sm font-medium">Applicants</p>
                                <p className="text-gray-800 font-bold text-sm sm:text-lg mt-1">{company.appliedStudents?.length || 0} Applied</p>
                            </div>
                        </div>

                        {company.description && (
                            <div className="mb-5 sm:mb-6">
                                <h3 className="font-bold text-gray-700 mb-2 text-sm sm:text-base">About the Role</h3>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 sm:p-4 text-sm sm:text-base">{company.description}</p>
                            </div>
                        )}

                        {hasApplied ? (
                            <div className="w-full bg-green-50 border-2 border-green-300 text-green-700 py-3 sm:py-4 rounded-xl font-bold text-center text-sm sm:text-lg">
                                You have already applied to this company
                            </div>
                        ) : (
                            <button
                                id="apply-btn"
                                onClick={handleApply}
                                disabled={applying}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition duration-300"
                            >
                                {applying ? 'Submitting Application...' : isLoggedIn ? 'Apply Now' : 'Login to Apply'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
