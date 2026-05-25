const express = require("express");

const router = express.Router();

const {
    executeCode
} = require("../controllers/codeExecution.controller");

/**
 * @route   POST /api/code/execute
 * @desc    Execute code using Piston API
 * @access  Private
*/
router.post(
    "/execute",
    executeCode
);

module.exports = router;