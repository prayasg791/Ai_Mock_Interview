const axios = require("axios");

const executeCode = async (req, res) => {

    try {

        const { language, code } = req.body;

        if (language !== "javascript") {

            return res.status(400).json({
                success: false,
                error:
                    "Currently only JavaScript supported"
            });

        }

        let output = "";

        // Save original console.log
        const originalLog = console.log;

        // Capture console.log output
        console.log = (...args) => {

            output +=
                args.join(" ") + "\n";

        };

        try {

            eval(code);

        }
        catch (err) {

            output = err.message;

        }

        // Restore console.log
        console.log = originalLog;

        return res.status(200).json({

            success: true,

            output:
                output ||
                "Code executed successfully"

        });

    }
    catch (error) {

        console.error(
            "Code execution error:",
            error
        );

        return res.status(500).json({

            success: false,

            error:
                "Failed to execute code"

        });

    }

};

module.exports = {
    executeCode
};