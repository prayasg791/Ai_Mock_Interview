import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    const logout = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.get(
                "https://ai-mock-interview-5mmv.onrender.com/api/auth/logout",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            navigate("/login",{replace:true});

        }
        catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    };

    const createRoom = () => {
        const randomRoomId = Math.random().toString(36).substring(2, 8);
        navigate(`/room/${randomRoomId}`);
    };

    const joinRoom = (e) => {
        if (e) e.preventDefault();
        if (!roomId.trim()) return;
        navigate(`/room/${roomId}`);
    };



return (

    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-[#1a1a24]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/10">

                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>

            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">

                AI Mock Interview

            </h1>

            <p className="text-gray-400 text-center text-sm mb-8">

                Practice real-time coding with AI feedback

            </p>

            {/* Logout */}
            <button
                onClick={logout}
                className="w-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white py-3 rounded-xl font-semibold mb-5"
            >
                Logout
            </button>

            {/* Create Room */}
            <button
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] transition-all duration-200 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
            >

                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>

                Create New Interview

            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">

                <div className="flex-1 h-px bg-white/10"></div>

                <span className="text-gray-500 text-sm">
                    OR
                </span>

                <div className="flex-1 h-px bg-white/10"></div>

            </div>

            {/* Join Form */}
            <form
                onSubmit={joinRoom}
                className="space-y-3"
            >

                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) =>
                        setRoomId(e.target.value)
                    }
                    className="w-full bg-[#0a0a0f] border border-white/10 focus:border-violet-500 outline-none text-white px-4 py-3 rounded-xl transition-all duration-200"
                />

                <button
                    type="submit"
                    disabled={!roomId.trim()}
                    className="w-full bg-[#232334] hover:bg-[#2a2a3e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                >

                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>

                    Join Existing Room

                </button>

            </form>

            {/* History */}
            <button
                onClick={() =>
                    navigate("/history")
                }
                className="w-full mt-6 text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >

                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>

                View Previous Interviews

            </button>

        </div>

    </div>

);
};

export default Dashboard;