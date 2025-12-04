const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    getWellnessSummary,
    createLog,
    getLogs,
    getReminders,
    createReminder
} = require('../controllers/patient.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes are protected and require patient role
router.use(protect);
router.use(authorize('patient'));

// Profile routes
router.route('/profile')
    .get(getProfile)
    .put(updateProfile);

// Wellness route
router.get('/wellness', getWellnessSummary);

// Daily logs routes
router.route('/logs')
    .get(getLogs)
    .post(createLog);

// Reminders routes
router.route('/reminders')
    .get(getReminders)
    .post(createReminder);

module.exports = router;
