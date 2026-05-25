import { useEffect, useState } from "react";

import axios from "axios";

const History = () => {

    const [interviews, setInterviews] =
        useState([]);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:3000/api/history/all"
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

        <div
            style={{
                padding: "20px",
                background: "#0f172a",
                minHeight: "100vh",
                color: "white"
            }}
        >

            <h1>
                Previous Interviews
            </h1>

            <br />

            {
                interviews.map((item) => (

                    <div
                        key={item._id}
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            marginBottom: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <p>
                            <strong>
                                Room:
                            </strong>
                            {" "}
                            {item.roomId}
                        </p>

                        <p>
                            <strong>
                                Language:
                            </strong>
                            {" "}
                            {item.language}
                        </p>

                        <p>
                            <strong>
                                Score:
                            </strong>
                            {" "}
                            {item.feedback?.score}
                            /
                            {item.feedback?.totalScore}
                        </p>

                        <p>
                            <strong>
                                Date:
                            </strong>
                            {" "}
                            {
                                new Date(
                                    item.createdAt
                                ).toLocaleString()
                            }
                        </p>

                    </div>

                ))
            }

        </div>

    );

};

export default History;