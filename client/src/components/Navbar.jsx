import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, Activity, LogOut, Heart } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isPatient, isProvider } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg">
                            <Heart size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">HealthCare Portal</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                {isPatient && (
                                    <>
                                        <Link
                                            to="/patient/dashboard"
                                            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                                        >
                                            <Home size={20} />
                                            <span className="font-medium">Dashboard</span>
                                        </Link>
                                        <Link
                                            to="/patient/tracker"
                                            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                                        >
                                            <Activity size={20} />
                                            <span className="font-medium">Goal Tracker</span>
                                        </Link>
                                        <Link
                                            to="/patient/profile"
                                            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                                        >
                                            <User size={20} />
                                            <span className="font-medium">Profile</span>
                                        </Link>
                                    </>
                                )}

                                {isProvider && (
                                    <>
                                        <Link
                                            to="/provider/dashboard"
                                            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                                        >
                                            <Home size={20} />
                                            <span className="font-medium">Dashboard</span>
                                        </Link>
                                    </>
                                )}

                                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <LogOut size={18} />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/health-info"
                                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
                                >
                                    Health Info
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg hover:shadow-md transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
