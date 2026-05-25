//server create karna hai...
const express = require('express');

const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use(cookieParser());


//Require all the routes here...
const authRouter = require('./routes/auth.routes');

const InterviewRouter = require("./routes/interview.routes");

const codeExecutionRouter = require("./routes/codeExecution.routes");

const aiRouter = require("./routes/ai.routes");

const interviewHistoryRouter = require("./routes/interviewHistory.routes");


//Using all the routes here...
app.use("/api/auth", authRouter);

app.use("/api/interview", InterviewRouter);

app.use("/api/code", codeExecutionRouter);

app.use("/api/ai", aiRouter);

app.use("/api/history",interviewHistoryRouter);

module.exports = app;