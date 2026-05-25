const InterviewRoomModel = require("../model/interviewRoom.model")
const {v4:uuidv4}=require('uuid')

const createInterviewRoom = async (req, res) => {
try{
const {title}=req.body;
const userId=req.user?req.user._id:req.body.createdBy;

//validation
if(!title){
    return res.status(400).json({
        success:false,
        error:"Interview title is required.."
    });
}
if(!userId){
    return res.status(400).json({
        success:false,
        error:"Unauthorized: User id is required to create a room.."
    });
}

//generate unique id
const generatedRoomId=uuidv4();

//save to database
const newRoom = await InterviewRoomModel.create({
    title: title,
    roomId: generatedRoomId,
    createdBy: userId,
    participants: [userId], // Automatically add the creator as the first participant
    status: "active"
 });

//Send Success Response
        return res.status(201).json({
            success: true,
            message: "Interview room created successfully!",
            room: newRoom
        });
}
catch(error){
console.error("Error creating interview room:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Internal server error while creating room." 
});
}
}

const getMyInterviewRoom = async (req, res) => {
try {

        const userId = req.user._id;

        const rooms = await InterviewRoomModel.find({
            createdBy: userId
        });

        return res.status(200).json({
            success: true,
            rooms
        });
}
catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        });
}
}

const joinInterviewRoom = async (req, res) => {
    try{
    const userId = req.user._id;
    const { roomId } = req.params;

     // Find room in DB
        const room = await InterviewRoomModel.findOne({
            roomId: roomId
        });

         // Check if room exists
        if (!room) {
            return res.status(404).json({
                success: false,
                error: "Interview room not found"
            });
        }

         // Check if user already joined
        const alreadyJoined = room.participants.includes(userId);

        if (!alreadyJoined) {

            // Add user to participants array
            room.participants.push(userId);

            // Save updated room
            await room.save();
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: "Joined interview room successfully",
            room
        });
    }
    catch(error){
          console.error("Error joining room:", error);

        return res.status(500).json({
            success: false,
            error: "Internal server error while joining room"
        });
    }
}

module.exports={createInterviewRoom,
    getMyInterviewRoom,
    joinInterviewRoom
}