import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PublicHealthInfoPage from './pages/Public/healt-info';
import PatientProfile from './pages/Profile/PatientProfile';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import GoalTracker from './pages/GoalTracker/GoalTracker';

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/health-info" element={<PublicHealthInfoPage />} />

            {/* Patient Routes - Protected */}
            <Route
                path="/patient/dashboard"
                element={
                    <ProtectedRoute requiredRole="patient">
                        <PatientDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/patient/profile"
                element={
                    <ProtectedRoute requiredRole="patient">
                        <PatientProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/patient/tracker"
                element={
                    <ProtectedRoute requiredRole="patient">
                        <GoalTracker />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
