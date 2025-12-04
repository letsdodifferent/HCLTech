import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PatientProfile from './pages/Profile/PatientProfile'; 
import PublicHealthInfoPage from './pages/Public/healt-info'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/PatientProfile" element={<PatientProfile/>}/>
                <Route path="/PublicHealth" element={<PublicHealthInfoPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
