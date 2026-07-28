import { useNavigate } from "react-router-dom";

function CompanyCard({ id, name, salaryPackage, location, role }) {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                        {name?.charAt(0) || '?'}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-blue-100 text-sm">{role}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-medium">Job Role</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{role}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-medium">Package</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{salaryPackage}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-medium">Location</span>
                    <span className="text-gray-700 font-semibold text-sm">{location || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-medium">Status</span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Hiring Now</span>
                </div>

                <button
                    onClick={() => navigate(`/companies/${id}`)}
                    id={`view-company-${id}`}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition duration-300 text-sm"
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export default CompanyCard;
