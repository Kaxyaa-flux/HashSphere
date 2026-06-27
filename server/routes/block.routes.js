const express = require('express');
const router = express.Router();
const blockController = require('../controllers/block.controller');

// GET /api/block
router.get('/', blockController.getHistory);

// POST /api/block
router.post('/', blockController.saveBlock);

module.exports = router;
