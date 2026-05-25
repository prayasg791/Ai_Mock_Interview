const AIFeedback = ({ feedback }) => {

    return (

        <div
            style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "12px",
                color: "white",
                height: "100%",
                overflowY: "auto"
            }}
        >

            <h2>AI Feedback</h2>

            <p>
                <strong>Score:</strong>
                {" "}
                {feedback.score}/{feedback.totalScore}
            </p>

            <br />

            <p>
                <strong>Summary:</strong>
            </p>

            <p>
                {feedback.summary}
            </p>

            <br />

            <p>
                <strong>Strengths:</strong>
            </p>

            <ul>
                {
                    feedback.strengths?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>

            <br />

            <p>
                <strong>Weaknesses:</strong>
            </p>

            <ul>
                {
                    feedback.weaknesses?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>

            <br />

            <p>
                <strong>Suggestions:</strong>
            </p>

            <ul>
                {
                    feedback.suggestions?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>

            {
                feedback.exampleCode && (
                    <>
                        <br />

                        <p>
                            <strong>Example Code:</strong>
                        </p>

                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                background: "#1f2937",
                                padding: "10px",
                                borderRadius: "8px"
                            }}
                        >
                            {feedback.exampleCode}
                        </pre>
                    </>
                )
            }

        </div>

    );

};

export default AIFeedback;