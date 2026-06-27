const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/crypto.controller');

// GET /api/prices
router.get('/', cryptoController.getPrices);

module.exports = router;
