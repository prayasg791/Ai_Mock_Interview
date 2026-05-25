const mongoose=require('mongoose')
const InterviewRoomSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    roomId: {
        type: String,
        required: true,
        unique: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],

    status: {
        type: String,
        enum: ["active", "ended"],
        default: "active"
    }

}, {
    timestamps: true
})

const InterviewRoomModel = mongoose.model("InterviewRoom",InterviewRoomSchema)

module.exports = InterviewRoomModel