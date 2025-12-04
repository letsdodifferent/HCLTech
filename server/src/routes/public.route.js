const express = require('express');
const router = express.Router();
const {
    getHealthInfo,
    getHealthTip
} = require('../controllers/public.controller');

// Public routes - no authentication required
router.get('/health-info', getHealthInfo);
router.get('/tip', getHealthTip);

module.exports = router;
