const express = require('express');
const router = express.Router();
const {
    assignPatient,
    getAssignedPatients,
    getPatientOverview,
    updateCompliance
} = require('../controllers/provider.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes are protected and require provider role
router.use(protect);
router.use(authorize('provider'));

// Assign patient to provider
router.post('/assign', assignPatient);

// Get all assigned patients
router.get('/patients', getAssignedPatients);

// Get specific patient overview
router.get('/patients/:id', getPatientOverview);

// Update patient compliance status
router.put('/patients/:id/compliance', updateCompliance);

module.exports = router;
