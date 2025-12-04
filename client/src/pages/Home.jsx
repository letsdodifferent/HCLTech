import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-xl mb-8">
                                <Heart size={40} className="text-white" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Your Health,
                                <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent"> Our Priority</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                                A comprehensive healthcare platform connecting patients with providers,
                                tracking wellness goals, and promoting preventive care.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-teal-800 transition-all"
                                >
                                    Get Started
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    to="/health-info"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition-all"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Everything You Need for Better Health
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Comprehensive tools and features designed to help you achieve your wellness goals
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                                    <Activity size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Tracking</h3>
                                <p className="text-gray-600">
                                    Track your daily steps, water intake, sleep, and active time with ease.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <Users size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Provider Connect</h3>
                                <p className="text-gray-600">
                                    Connect with healthcare providers who monitor your progress and compliance.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <Heart size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Preventive Care</h3>
                                <p className="text-gray-600">
                                    Get reminders for checkups, vaccinations, and preventive health screenings.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <Shield size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                                <p className="text-gray-600">
                                    Your health data is encrypted and protected with industry-standard security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Why Choose Our Platform?
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        'Comprehensive wellness tracking and goal management',
                                        'Direct connection with healthcare providers',
                                        'Personalized health tips and recommendations',
                                        'Preventive care reminders and notifications',
                                        'Secure data storage with HIPAA compliance',
                                        'Easy-to-use interface for all ages'
                                    ].map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1">
                                                <CheckCircle size={16} className="text-teal-600" />
                                            </div>
                                            <p className="text-gray-700 text-lg">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-12 text-white shadow-2xl">
                                <h3 className="text-3xl font-bold mb-6">Ready to Start Your Health Journey?</h3>
                                <p className="text-teal-100 mb-8 text-lg">
                                    Join thousands of users who are taking control of their health with our platform.
                                </p>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors w-full"
                                >
                                    Create Free Account
                                    <ArrowRight size={20} />
                                </Link>
                                <p className="text-teal-200 text-sm mt-4 text-center">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-white font-medium underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Heart size={24} className="text-teal-400" />
                                <span className="text-xl font-bold">HealthCare Portal</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Empowering healthier lives through technology
                            </p>
                            <div className="flex justify-center gap-8 text-sm text-gray-400">
                                <Link to="/health-info" className="hover:text-white transition-colors">
                                    Health Information
                                </Link>
                                <a href="#" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </div>
                            <p className="text-gray-500 text-sm mt-8">
                                © 2025 HealthCare Portal. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
