import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Heart, Activity, Save, Edit2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { patientAPI } from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const PatientProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await patientAPI.getProfile();
            const profileData = response.data.data;
            setProfile(profileData);
            setFormData({
                name: profileData.name || '',
                age: profileData.age || '',
                phone: profileData.phone || '',
                address: profileData.address || '',
                allergies: profileData.allergies || '',
                currentMedications: profileData.currentMedications || '',
                stepsGoal: profileData.stepsGoal || 8000,
                activeTimeGoal: profileData.activeTimeGoal || 30,
                sleepGoal: profileData.sleepGoal || 7,
                waterGoal: profileData.waterGoal || 2.5,
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            setSaving(true);

            const updateData = {
                ...formData,
                age: parseInt(formData.age),
                stepsGoal: parseInt(formData.stepsGoal),
                activeTimeGoal: parseInt(formData.activeTimeGoal),
                sleepGoal: parseFloat(formData.sleepGoal),
                waterGoal: parseFloat(formData.waterGoal),
            };

            await patientAPI.updateProfile(updateData);
            await fetchProfile();
            setEditing(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setError(null);
        // Reset form data to current profile
        if (profile) {
            setFormData({
                name: profile.name || '',
                age: profile.age || '',
                phone: profile.phone || '',
                address: profile.address || '',
                allergies: profile.allergies || '',
                currentMedications: profile.currentMedications || '',
                stepsGoal: profile.stepsGoal || 8000,
                activeTimeGoal: profile.activeTimeGoal || 30,
                sleepGoal: profile.sleepGoal || 7,
                waterGoal: profile.waterGoal || 2.5,
            });
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <LoadingSpinner size="lg" text="Loading your profile..." />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg">
                                    <User size={28} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                                    <p className="text-gray-600">Manage your personal information and wellness goals</p>
                                </div>
                            </div>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-600">Profile updated successfully!</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User size={16} className="inline mr-1" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail size={16} className="inline mr-1" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile?.email || ''}
                                        disabled
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Phone size={16} className="inline mr-1" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin size={16} className="inline mr-1" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <CreditCard size={16} className="inline mr-1" />
                                        Aadhar Card
                                    </label>
                                    <input
                                        type="text"
                                        value={profile?.aadharCard || ''}
                                        disabled
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Aadhar card cannot be changed</p>
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Medical Information</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Heart size={16} className="inline mr-1" />
                                        Allergies
                                    </label>
                                    <textarea
                                        name="allergies"
                                        value={formData.allergies}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        rows="3"
                                        placeholder="e.g., Peanuts, Dust, Pollen"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Medications
                                    </label>
                                    <textarea
                                        name="currentMedications"
                                        value={formData.currentMedications}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        rows="3"
                                        placeholder="e.g., Aspirin 100mg daily, Vitamin D"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Wellness Goals */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Activity size={20} className="text-teal-600" />
                                    Wellness Goals
                                </h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Daily Steps Goal
                                    </label>
                                    <input
                                        type="number"
                                        name="stepsGoal"
                                        value={formData.stepsGoal}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        min="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Active Time Goal (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="activeTimeGoal"
                                        value={formData.activeTimeGoal}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        min="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sleep Goal (hours)
                                    </label>
                                    <input
                                        type="number"
                                        name="sleepGoal"
                                        value={formData.sleepGoal}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        step="0.5"
                                        min="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Water Intake Goal (litres)
                                    </label>
                                    <input
                                        type="number"
                                        name="waterGoal"
                                        value={formData.waterGoal}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        step="0.1"
                                        min="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {editing && (
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default PatientProfile;