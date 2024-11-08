const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');

// Endpoint to add toy to inventory
router.post('/add', toyController.addToyToInventory);

module.exports = router;