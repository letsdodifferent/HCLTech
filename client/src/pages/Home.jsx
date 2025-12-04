import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <h1 className="text-4xl font-bold text-blue-900 mb-8">Welcome to HealthCare App</h1>
            <div className="space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
