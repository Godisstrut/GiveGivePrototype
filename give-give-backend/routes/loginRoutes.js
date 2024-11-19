const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');

// Define the login endpoint
router.get('/', login);

module.exports = router;