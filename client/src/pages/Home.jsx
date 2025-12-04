import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-teal-600">HealthCare+</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium">Login</Link>
                            <Link to="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Your Health,</span>
                        <span className="block text-teal-600">Our Priority</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Manage your health records, track your goals, and connect with healthcare providers seamlessly.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10">
                                Join Now
                            </Link>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; 2024 HealthCare+. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
