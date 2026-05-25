const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// We define the model outside the function so we only initialize it once.
// Notice we added the generationConfig to strictly enforce JSON output.
const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

const generateFeedback = async (req, res) => {
    try {
        const { code, language } = req.body;
        
        // The prompt now explicitly defines the JSON schema we need for the frontend
        const prompt = `
        You are an expert AI coding interviewer.
        Analyze the following code.
        
        Language: ${language}
        Code:
        ${code}

        Return your analysis STRICTLY as a JSON object matching this exact structure:
        {
          "score": <number between 1-10>,
          "totalScore": 10,
          "summary": "<2-3 lines of overall feedback>",
          "strengths": ["<point 1>", "<point 2>", "<point 3>"],
          "weaknesses": ["<point 1>", "<point 2>"],
          "suggestions": ["<suggestion 1>", "<suggestion 2>"],
          "exampleCode": "<A short, improved code snippet addressing the weaknesses>"
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Parse the JSON string returned by Gemini into a usable JavaScript object
        const feedbackData = JSON.parse(textResponse);

        return res.status(200).json({
            success: true,
            feedback: feedbackData
        });

    } catch (error) {
        console.error("Gemini feedback error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to generate AI feedback"
        });
    }
}

module.exports = {
    generateFeedback
};