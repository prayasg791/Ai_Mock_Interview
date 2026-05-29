import { useEffect, useState } from "react";

import axios from "axios";

const History = () => {

    const [interviews, setInterviews] =
        useState([]);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const user =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                   const userId = user._id || user.id;

                const response =
                    await axios.get(
                        `https://ai-mock-interview-5mmv.onrender.com/api/history/all/${userId}`
                    );

                console.log("USER:", user);

                console.log(
                    "API RESPONSE:",
                    response.data
                );
                setInterviews(
                    response.data.interviews
                );

            }
            catch (error) {

                console.error(
                    "Fetch history error:",
                    error
                );

            }

        };

        fetchHistory();

    }, []);

    return (

        <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-10">

            {/* Heading */}
            <div className="max-w-6xl mx-auto mb-10">

                <h1 className="text-5xl font-bold mb-3 bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">

                    Previous Interviews

                </h1>

                <p className="text-gray-400 text-lg">

                    View all your past AI mock interviews

                </p>

            </div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    interviews.map((item) => (

                        <div
                            key={item._id}
                            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300"
                        >

                            {/* Room ID */}
                            <div className="mb-4">

                                <p className="text-gray-400 text-sm mb-1">
                                    Room ID
                                </p>

                                <h2 className="text-xl font-semibold text-white break-all">

                                    {item.roomId}

                                </h2>

                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between mb-4">

                                <div>

                                    <p className="text-gray-400 text-sm">
                                        Language
                                    </p>

                                    <p className="text-white font-medium capitalize">

                                        {item.language}

                                    </p>

                                </div>

                                <div className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-sm border border-violet-500/20">

                                    AI Reviewed

                                </div>

                            </div>

                            {/* Score */}
                            <div className="mb-5">

                                <p className="text-gray-400 text-sm mb-2">
                                    Interview Score
                                </p>

                                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">

                                    <div
                                        className="bg-gradient-to-r from-violet-500 to-indigo-500 h-3 rounded-full"
                                        style={{
                                            width: `${(item.feedback?.score / item.feedback?.totalScore) * 100}%`
                                        }}
                                    ></div>

                                </div>

                                <p className="mt-2 text-right text-sm text-violet-400 font-semibold">

                                    {item.feedback?.score}
                                    /
                                    {item.feedback?.totalScore}

                                </p>

                            </div>

                            {/* Date */}
                            <div className="border-t border-gray-800 pt-4">

                                <p className="text-gray-400 text-sm mb-1">
                                    Date
                                </p>

                                <p className="text-white text-sm">

                                    {
                                        new Date(
                                            item.createdAt
                                        ).toLocaleString()
                                    }

                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

};

export default History;