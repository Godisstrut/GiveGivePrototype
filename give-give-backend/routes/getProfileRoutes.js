const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/getProfileController');

// Endpoint to get child_id from username to inventory
router.get('/', getProfile);

module.exports = router;