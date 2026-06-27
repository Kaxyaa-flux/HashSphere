const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

// GET /api/feedback
router.get('/', feedbackController.getFeedback);

// POST /api/feedback
router.post('/', feedbackController.saveFeedback);

module.exports = router;
