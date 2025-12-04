const User = require('../models/User.model.js');
const DailyLog = require('../models/DadilyLogs.model.js');

// @desc    Assign a patient to provider
// @route   POST /api/v1/provider/assign
// @access  Private (Provider only)
exports.assignPatient = async (req, res) => {
    try {
        const { patientId } = req.body;

        // Validation
        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID is required'
            });
        }

        // Check if patient exists
        const patient = await User.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Check if patient role is correct
        if (patient.role !== 'patient') {
            return res.status(400).json({
                success: false,
                message: 'User is not a patient'
            });
        }

        // Check if patient is already assigned to another provider
        if (patient.healthcareProvider && patient.healthcareProvider.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Patient is already assigned to another healthcare provider'
            });
        }

        // Check if already assigned to this provider
        if (patient.healthcareProvider && patient.healthcareProvider.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Patient is already assigned to you'
            });
        }

        // Assign patient to provider
        patient.healthcareProvider = req.user._id;
        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Patient assigned successfully',
            data: {
                patientId: patient._id,
                patientName: patient.name,
                patientEmail: patient.email
            }
        });
    } catch (error) {
        console.error('Assign patient error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all assigned patients with compliance status
// @route   GET /api/v1/provider/patients
// @access  Private (Provider only)
exports.getAssignedPatients = async (req, res) => {
    try {
        const patients = await User.find({
            healthcareProvider: req.user._id,
            role: 'patient'
        }).select('name email phone age complianceStatus stepsGoal activeTimeGoal sleepGoal waterGoal');

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        console.error('Get assigned patients error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get full patient overview (profile + goals + recent logs)
// @route   GET /api/v1/provider/patients/:id
// @access  Private (Provider only)
exports.getPatientOverview = async (req, res) => {
    try {
        const { id } = req.params;

        // Get patient profile
        const patient = await User.findById(id).select('-password');

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Check if patient is assigned to this provider
        if (!patient.healthcareProvider || patient.healthcareProvider.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this patient'
            });
        }

        // Get recent daily logs (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentLogs = await DailyLog.find({
            userId: id,
            date: { $gte: thirtyDaysAgo }
        }).sort({ date: -1 });

        // Calculate statistics
        let avgSteps = 0, avgWater = 0, avgSleep = 0, avgActive = 0;
        let goalsMetCount = 0;

        if (recentLogs.length > 0) {
            recentLogs.forEach(log => {
                avgSteps += log.steps;
                avgWater += log.waterLitres;
                avgSleep += log.sleepHours;
                avgActive += log.activeMinutes;
                if (log.goalsMet) goalsMetCount++;
            });

            avgSteps = Math.round(avgSteps / recentLogs.length);
            avgWater = (avgWater / recentLogs.length).toFixed(1);
            avgSleep = (avgSleep / recentLogs.length).toFixed(1);
            avgActive = Math.round(avgActive / recentLogs.length);
        }

        res.status(200).json({
            success: true,
            data: {
                profile: patient,
                goals: {
                    stepsGoal: patient.stepsGoal,
                    activeTimeGoal: patient.activeTimeGoal,
                    sleepGoal: patient.sleepGoal,
                    waterGoal: patient.waterGoal
                },
                statistics: {
                    avgSteps,
                    avgWater: parseFloat(avgWater),
                    avgSleep: parseFloat(avgSleep),
                    avgActive,
                    goalsMetPercentage: recentLogs.length > 0
                        ? Math.round((goalsMetCount / recentLogs.length) * 100)
                        : 0,
                    totalLogs: recentLogs.length
                },
                recentLogs: recentLogs.slice(0, 10) // Last 10 logs
            }
        });
    } catch (error) {
        console.error('Get patient overview error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update patient compliance status
// @route   PUT /api/v1/provider/patients/:id/compliance
// @access  Private (Provider only)
exports.updateCompliance = async (req, res) => {
    try {
        const { id } = req.params;
        const { complianceStatus } = req.body;

        // Validation
        const validStatuses = ['Goal Met', 'Missed Preventive Checkup', 'Pending'];
        if (!complianceStatus || !validStatuses.includes(complianceStatus)) {
            return res.status(400).json({
                success: false,
                message: `Invalid compliance status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        // Get patient
        const patient = await User.findById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Check if patient is assigned to this provider
        if (!patient.healthcareProvider || patient.healthcareProvider.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this patient'
            });
        }

        // Update compliance status
        patient.complianceStatus = complianceStatus;
        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Compliance status updated successfully',
            data: {
                patientId: patient._id,
                patientName: patient.name,
                complianceStatus: patient.complianceStatus
            }
        });
    } catch (error) {
        console.error('Update compliance error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
