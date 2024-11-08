const express = require('express');
const router = express.Router();
const { postImageForAi } = require('../controllers/postImageForAI');

// Endpoint to get child_id from username to inventory
router.get('/', postImageForAi);

module.exports = router;