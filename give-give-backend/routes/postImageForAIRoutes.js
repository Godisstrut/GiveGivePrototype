const express = require('express');
const router = express.Router();
const { postImageForAI } = require('../controllers/postImageForAIController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Define the route as a POST request
router.post('/', upload.single('image'), postImageForAI);

module.exports = router;