require('dotenv').config();

const http = require("http");

const app = require('./src/app');

const connecTODB = require('./src/config/database');

const setupSocketServer = require("./src/socket/socket");

connecTODB();

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
setupSocketServer(server);

// Start server
server.listen(3000, () => {
    console.log("Server started running perfectly..");
});