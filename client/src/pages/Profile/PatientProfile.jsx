import React, { useState } from 'react';
import { Save, Edit2, X } from 'lucide-react';

export default function PatientProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        bloodType: 'O+',
        height: '5\'10"',
        weight: '180 lbs',
        allergies: 'Penicillin, Peanuts',
        currentMedications: 'Metformin 500mg, Lisinopril 10mg',
        medicalConditions: 'Type 2 Diabetes, Hypertension',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '(555) 987-6543',
    });

    const [formData, setFormData] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
        setFormData(profile);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(profile);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setProfile(formData);
        setIsEditing(false);
        // Here you would typically make an API call to save the data
        alert('Profile updated successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                {profile.firstName} {profile.lastName}
                            </h1>
                            <p className="text-gray-600 mt-2">{profile.email}</p>
                        </div>
                        <div className="flex gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                                    >
                                        <Save size={18} />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                First Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.firstName}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Last Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.lastName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.phone}</p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Date of Birth
                            </label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.dateOfBirth}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Gender
                            </label>
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            ) : (
                                <p className="text-gray-600 py-2">{profile.gender}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Health Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                        Health Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Blood Type */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Blood Type
                            </label>
                            {isEditing ? (
                                <select
                                    name="bloodType"
                                    value={formData.bloodType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>O+</option>
                                    <option>O-</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                </select>
                            ) : (
                                <p className="text-gray-600 py-2">{profile.bloodType}</p>
                            )}
                        </div>

                        {/* Height */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Height
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    placeholder={"e.g., 5'10\""}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.height}</p>
                            )}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Weight
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 180 lbs"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.weight}</p>
                            )}
                        </div>

                        {/* Medical Conditions */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Medical Conditions
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="medicalConditions"
                                    value={formData.medicalConditions}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Diabetes, Hypertension"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.medicalConditions}</p>
                            )}
                        </div>

                        {/* Allergies */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Allergies
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleInputChange}
                                    placeholder="List any known allergies"
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.allergies}</p>
                            )}
                        </div>

                        {/* Current Medications */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Current Medications
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="currentMedications"
                                    value={formData.currentMedications}
                                    onChange={handleInputChange}
                                    placeholder="List all current medications and dosages"
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.currentMedications}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                        Emergency Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Emergency Contact Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Contact Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.emergencyContact}</p>
                            )}
                        </div>

                        {/* Emergency Contact Phone */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Contact Phone
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 py-2">{profile.emergencyPhone}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}