const axios = require("axios");
const executeCode = async (req, res) => {
try {

    const { language, code } = req.body;

    const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
            language,
            source: code
        }
    );

    return res.status(200).json({
        success: true,
        output: response.data.output
    });

}
catch (error) {

    console.error("Code execution error:", error);

    return res.status(500).json({
        success: false,
        error: "Failed to execute code"
    });

}
}
module.exports = {
    executeCode
};
