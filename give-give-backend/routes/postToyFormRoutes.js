const express = require('express');
const router = express.Router();
const { postToyFormController } = require('../controllers/postToyFormController');

// Endpoint to get child_id from username to inventory
router.post('/', postToyFormController);

module.exports = router;