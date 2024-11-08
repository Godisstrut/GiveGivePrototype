const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login');

// Define the login endpoint
router.get('/', login);

module.exports = router;