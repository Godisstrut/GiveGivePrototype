const express = require('express');
const router = express.Router();
const { getInventory } = require('../controllers/getInventoryController');

// Endpoint to get child_id from username to inventory
router.get('/', getInventory);

module.exports = router;