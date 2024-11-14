const express = require('express');
const router = express.Router();
const { postToyForm } = require('../controllers/postToyForm');

// Endpoint to get child_id from username to inventory
router.post('/', postToyForm);

module.exports = router;