import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for JWT
});

// Request interceptor - attach token to every request
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;

                case 403:
                    // Forbidden - user doesn't have permission
                    console.error('Access forbidden:', data.message);
                    break;

                case 404:
                    // Not found
                    console.error('Resource not found:', data.message);
                    break;

                case 500:
                    // Server error
                    console.error('Server error:', data.message);
                    break;

                default:
                    console.error('API Error:', data.message);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error - no response from server');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
};

// Patient API calls
export const patientAPI = {
    getProfile: () => api.get('/patient/profile'),
    updateProfile: (data) => api.put('/patient/profile', data),
    getWellness: () => api.get('/patient/wellness'),
    createLog: (logData) => api.post('/patient/logs', logData),
    getLogs: () => api.get('/patient/logs'),
    getReminders: () => api.get('/patient/reminders'),
    createReminder: (reminderData) => api.post('/patient/reminders', reminderData),
};

// Provider API calls
export const providerAPI = {
    assignPatient: (patientId) => api.post('/provider/assign', { patientId }),
    getPatients: () => api.get('/provider/patients'),
    getPatientOverview: (patientId) => api.get(`/provider/patients/${patientId}`),
    updateCompliance: (patientId, status) =>
        api.put(`/provider/patients/${patientId}/compliance`, { complianceStatus: status }),
};

// Public API calls
export const publicAPI = {
    getHealthInfo: () => api.get('/public/health-info'),
    getHealthTip: () => api.get('/public/tip'),
};

export default api;
