const express = require('express');
const router = express.Router();
const { postImageForAI } = require('../controllers/postImageForAI');

// Define the route as a POST request
router.post('/', postImageForAI);

module.exports = router;