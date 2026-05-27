import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";

// Component Imports
import ParticipantsInfo from "../components/ParticipantsInfo";
import LanguageSelector from "../components/LanguageSelector";
import CodeEditor from "../components/CodeEditor";
import AIFeedback from "../components/AIFeedback";

const Room = () => {
    const [code, setCode] = useState("// Start coding here...");
    const [usersCount, setUsersCount] = useState(0);
    const [language, setLanguage] = useState("cpp");
    const { roomId } = useParams();

    // Feedback state will hold the parsed JSON object for the AIFeedback component
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);

    useEffect(() => {
        // Join room
        socket.emit("join_room", roomId);
        console.log("Joined room:", roomId);

        // Define event handlers
        const handleReceiveCode = (incomingCode) => {
            setCode(incomingCode);
        };

        const handleRoomUsers = (count) => {
            setUsersCount(count);
        };

        // Listen for socket events
        socket.on("receive_code", handleReceiveCode);
        socket.on("room_users", handleRoomUsers);

        socket.on(
            "receive_feedback",
            (incomingFeedback) => {

                setFeedback(incomingFeedback);

            }
        );

        // Cleanup when leaving room / component unmount
        return () => {
            socket.off("receive_code", handleReceiveCode);
            socket.off("room_users", handleRoomUsers);
            socket.off("receive_feedback");      ////////////////////////////
            socket.emit("leave_room", roomId);
            console.log("Left room:", roomId);
        };
    }, [roomId]);

    // Handle code changes from the CodeEditor component
    const handleCodeChange = (value) => {
        setCode(value);
        socket.emit("code_change", {
            roomId,
            code: value
        });
    };

    const generateAiFeedback = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:3000/api/ai/feedback",
                {
                    language,
                    code
                }
            );

            // Assuming your backend returns a JSON object that matches the AIFeedback props.
            // If it returns a string, you may need to parse it: JSON.parse(response.data.feedback)
            const feedbackData = response.data.feedback;

            // For testing purposes, if your API still returns a raw string, 
            // you might want to map it manually here. But ideally, the API sends JSON.
            setFeedback(feedbackData);

            /////////////////////////////////////
            socket.emit(
                "feedback_generated",
                {
                    roomId,
                    feedback: feedbackData
                }
            );
            //////////////////////////
            await axios.post(
                "http://localhost:3000/api/history/save",
                {
                    userId:
                        JSON.parse(
                            localStorage.getItem("user")
                        )._id,

                    roomId,

                    language,

                    code,

                    feedback: feedbackData
                }
            );
            ///////////////////////////////
        } catch (error) {
            console.error("AI Feedback Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleRunCode = async () => {

        try {

            setRunning(true);

            const response =
                await axios.post(
                    "http://localhost:3000/api/code/execute",
                    {
                        language,
                        code
                    }
                );

            setOutput(
                response.data.output
            );

        }
        catch (error) {

            console.error(
                "Code execution error:",
                error
            );

            setOutput(
                "Error running code"
            );

        }
        finally {

            setRunning(false);

        }

    };

    return (
        <div className="flex flex-col h-screen bg-[#12121a] text-gray-200 font-sans overflow-hidden">

            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#1a1a24] border-b border-gray-800">
                <ParticipantsInfo
                    roomId={roomId}
                    usersCount={usersCount}
                />

                <div className="flex items-center gap-4">
                    <LanguageSelector
                        language={language}
                        setLanguage={setLanguage}
                    />
                    <button
                        onClick={handleRunCode}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                    >

                        {
                            running
                                ? "Running..."
                                : "Run Code"
                        }

                    </button>
                    <button
                        onClick={generateAiFeedback}
                        disabled={loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${loading
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                    >
                        {loading ? "Analyzing Code..." : "✨ Generate AI Feedback"}
                    </button>
                </div>
            </div>

            {/* Main Content Split View */}
            <div className="flex flex-1 overflow-hidden gap-4 p-4 bg-[#0a0a0f]">

                {/* Left Side: Code Editor */}
                <div className="w-1/2 h-full border-r border-gray-800 flex flex-col">
                    <div className="flex-1 rounded-2xl overflow-hidden border border-gray-800 bg-[#111827] shadow-2xl">
                        <CodeEditor
                            code={code}
                            language={language}
                            onCodeChange={handleCodeChange}
                        />
                    </div>
                </div>
<div className="w-[420px] rounded-2xl overflow-hidden border border-gray-800 bg-[#111827] shadow-2xl flex flex-col">

    {/* Output Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">

        <h3 className="text-white font-semibold text-lg">
            Output
        </h3>

        <button
            onClick={() => setOutput("")}
            className="text-gray-400 hover:text-white text-sm"
        >
            Clear
        </button>

    </div>

    {/* Output Body */}
    <div className="flex-1 overflow-auto p-4">

        <pre className="text-green-400 whitespace-pre-wrap break-words">

            {
                output ||
                "Run code to see output..."
            }

        </pre>

    </div>

</div>

                {/* Right Side: AI Feedback Dashboard */}
                <div className="w-1/2 h-full p-6 overflow-y-auto bg-[#12121a]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <p>AI is reviewing your code...</p>
                        </div>
                    ) : feedback ? (
                        // Pass the feedback object directly as props using spread operator
                        <AIFeedback feedback={feedback} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
                            <p>Click "Generate AI Feedback" to analyze your code.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Room;