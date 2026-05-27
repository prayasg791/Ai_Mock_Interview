const express=require('express')

const router=express.Router();

const {saveInterview,getInterviewHistory}=require('../controllers/interviewHistory.controller');


/**
 * @route POST /interview-history/save
 * @description  Save interview history after an interview session
 * @access private
 */
router.post("/save",saveInterview);


/**
 * @route GET /interview-history/all
 * @description  Get all interview history
 * @access private
 */
router.get(
    "/all/:userId",
    getInterviewHistory
);

module.exports = router;