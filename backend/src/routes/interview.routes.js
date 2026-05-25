const express=require('express')
const InterviewRouter=express.Router()

const {
    createInterviewRoom,
    getMyInterviewRoom,
joinInterviewRoom}
    =require('../controllers/interview.controller');

const authInterviewRoom=require('../middlewares/interviewroom.middleware');


/**
 * @route POST /interview/create
 * @description  Create a new interview room
 * @access private
 */
InterviewRouter.post("/create",authInterviewRoom,createInterviewRoom);

/**
 * @route   GET /api/interview/my-rooms
 * @desc    Get all interview rooms created by logged-in user
 * @access  Private
 */
InterviewRouter.get("/my-rooms",authInterviewRoom,getMyInterviewRoom);

/**
 * @route   POST /api/interview/join/:roomId
 * @desc    Join an existing interview room
 * @access  Private
*/
InterviewRouter.post("/join/:roomId",authInterviewRoom,joinInterviewRoom);


module.exports=InterviewRouter
