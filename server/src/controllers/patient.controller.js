const User = require('../models/User.model.js');
const DailyLog = require('../models/DadilyLogs.model.js');
const Reminder = require('../models/remainder.model.js');

// @desc    Get patient profile
// @route   GET /api/v1/patient/profile
// @access  Private (Patient only)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('healthcareProvider', 'name email phone');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update patient profile
// @route   PUT /api/v1/patient/profile
// @access  Private (Patient only)
exports.updateProfile = async (req, res) => {
    try {
        const {
            name,
            age,
            phone,
            address,
            allergies,
            currentMedications,
            stepsGoal,
            activeTimeGoal,
            sleepGoal,
            waterGoal,
            photoUrl
        } = req.body;

        // Build update object with only provided fields
        const updateFields = {};
        if (name) updateFields.name = name;
        if (age) updateFields.age = age;
        if (phone) updateFields.phone = phone;
        if (address) updateFields.address = address;
        if (allergies !== undefined) updateFields.allergies = allergies;
        if (currentMedications !== undefined) updateFields.currentMedications = currentMedications;
        if (stepsGoal) updateFields.stepsGoal = stepsGoal;
        if (activeTimeGoal) updateFields.activeTimeGoal = activeTimeGoal;
        if (sleepGoal) updateFields.sleepGoal = sleepGoal;
        if (waterGoal) updateFields.waterGoal = waterGoal;
        if (photoUrl) updateFields.photoUrl = photoUrl;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get wellness summary (goals + latest logs)
// @route   GET /api/v1/patient/wellness
// @access  Private (Patient only)
exports.getWellnessSummary = async (req, res) => {
    try {
        // Get user goals
        const user = await User.findById(req.user._id).select('stepsGoal activeTimeGoal sleepGoal waterGoal');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get latest logs (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentLogs = await DailyLog.find({
            userId: req.user._id,
            date: { $gte: sevenDaysAgo }
        }).sort({ date: -1 });

        // Calculate averages
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
                goals: {
                    stepsGoal: user.stepsGoal,
                    activeTimeGoal: user.activeTimeGoal,
                    sleepGoal: user.sleepGoal,
                    waterGoal: user.waterGoal
                },
                recentActivity: {
                    avgSteps,
                    avgWater: parseFloat(avgWater),
                    avgSleep: parseFloat(avgSleep),
                    avgActive,
                    goalsMetPercentage: recentLogs.length > 0
                        ? Math.round((goalsMetCount / recentLogs.length) * 100)
                        : 0
                },
                recentLogs: recentLogs.slice(0, 5) // Last 5 logs
            }
        });
    } catch (error) {
        console.error('Get wellness summary error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create daily log
// @route   POST /api/v1/patient/logs
// @access  Private (Patient only)
exports.createLog = async (req, res) => {
    try {
        const { date, steps, waterLitres, sleepHours, activeMinutes, goalsMet } = req.body;

        // Validation
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required'
            });
        }

        // Check if log already exists for this date
        const existingLog = await DailyLog.findOne({
            userId: req.user._id,
            date: new Date(date)
        });

        if (existingLog) {
            return res.status(400).json({
                success: false,
                message: 'Log already exists for this date. Please update instead.'
            });
        }

        // Create log
        const log = await DailyLog.create({
            userId: req.user._id,
            date: new Date(date),
            steps: steps || 0,
            waterLitres: waterLitres || 0,
            sleepHours: sleepHours || 0,
            activeMinutes: activeMinutes || 0,
            goalsMet: goalsMet || false
        });

        res.status(201).json({
            success: true,
            message: 'Daily log created successfully',
            data: log
        });
    } catch (error) {
        console.error('Create log error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all logs for patient
// @route   GET /api/v1/patient/logs
// @access  Private (Patient only)
exports.getLogs = async (req, res) => {
    try {
        const logs = await DailyLog.find({ userId: req.user._id })
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all reminders for patient
// @route   GET /api/v1/patient/reminders
// @access  Private (Patient only)
exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user._id })
            .sort({ dueDate: 1 });

        res.status(200).json({
            success: true,
            count: reminders.length,
            data: reminders
        });
    } catch (error) {
        console.error('Get reminders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create reminder
// @route   POST /api/v1/patient/reminders
// @access  Private (Patient only)
exports.createReminder = async (req, res) => {
    try {
        const { title, dueDate } = req.body;

        // Validation
        if (!title || !dueDate) {
            return res.status(400).json({
                success: false,
                message: 'Title and due date are required'
            });
        }

        const reminder = await Reminder.create({
            userId: req.user._id,
            title,
            dueDate: new Date(dueDate),
            completed: false
        });

        res.status(201).json({
            success: true,
            message: 'Reminder created successfully',
            data: reminder
        });
    } catch (error) {
        console.error('Create reminder error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
