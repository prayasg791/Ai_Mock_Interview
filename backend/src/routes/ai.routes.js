const express = require("express");

const router = express.Router();

const {
    generateFeedback
} = require("../controllers/ai.controller");

/**
 * @route   POST /api/ai/feedback
 * @desc    Generate AI interview feedback
 * @access  Private
*/
router.post(
    "/feedback",
    generateFeedback
);

module.exports = router;