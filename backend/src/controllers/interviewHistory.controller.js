const InterviewHistory = require('../model/interviewHistory.model')

const saveInterview = async (req, res) => {
    try {
        const { userId, roomId, language, code, feedback } = req.body;
        const interview = await InterviewHistory.create({ userId, roomId, language, code, feedback });

        return res.status(201).json({
            success: true,
            interview
        });
    }
    catch (error) {
        console.error(
            "Save interview error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to save interview"
        });

    }
}

/*******************************************************
 * GET ALL INTERVIEW HISTORY
 *******************************************************/
const getInterviewHistory = async (
    req,
    res
) => {

    try {

        const { userId } = req.params;

        const interviews =
            await InterviewHistory.find({
                userId
            }).sort({
                createdAt: -1
            });

        return res.status(200).json({
            success: true,
            interviews
        });

    }
    catch (error) {

        console.error(
            "Get history error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to fetch history"
        });

    }

};
module.exports = { saveInterview, getInterviewHistory };