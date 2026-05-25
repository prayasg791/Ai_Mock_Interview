const mongoose = require("mongoose");

const interviewHistorySchema = new mongoose.Schema(
    {

        userId: {
            // type: mongoose.Schema.Types.ObjectId,
            type:String,
            // ref: "user",
            required: true
        },

        roomId: {
            type: String,
            required: true
        },

        language: {
            type: String,
            required: true
        },

        code: {
            type: String,
            required: true
        },

        feedback: {
            type: Object,
            required: true
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("InterviewHistory",interviewHistorySchema);