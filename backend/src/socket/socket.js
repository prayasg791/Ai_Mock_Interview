const { Server } = require("socket.io");

const roomCodeMap = {};//// Stores latest code for each room

const setupSocketServer = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on("connection", (socket) => {

        console.log("New user connected:", socket.id);

        /*******************************************************
         * USER JOINS AN INTERVIEW ROOM
         *******************************************************/
        socket.on("join_room", (roomId) => {

            socket.join(roomId);
            if (roomCodeMap[roomId]) {

                socket.emit(
                    "receive_code",
                    roomCodeMap[roomId]
                );

            }
            const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;

            io.to(roomId).emit(
                "room_users",
                roomSize
            );
            console.log(
                `Socket ${socket.id} joined room ${roomId}`
            );

            // Notify other users in room
            socket.to(roomId).emit(
                "user_joined",
                {
                    message: "A new user joined the room",
                    socketId: socket.id
                }
            );

        });

        /*******************************************************
     * REALTIME CODE SYNC
     *******************************************************/
        socket.on("code_change", (data) => {

            const { roomId, code } = data;

            roomCodeMap[roomId] = code;
            // Send code to everyone in room except sender
            socket.to(roomId).emit(
                "receive_code",
                code
            );

        });
        /*******************************************************
 * REALTIME AI FEEDBACK SYNC
 *******************************************************/
        socket.on(
            "feedback_generated",
            ({ roomId, feedback }) => {

                socket.to(roomId).emit(
                    "receive_feedback",
                    feedback
                );

            }
        );

        /*******************************************************
         * USER LEAVES AN INTERVIEW ROOM
         *******************************************************/
        socket.on("leave_room", (roomId) => {

            socket.leave(roomId);

            console.log(
                `Socket ${socket.id} left room ${roomId}`
            );

        });

        /*******************************************************
         * USER DISCONNECTS
         *******************************************************/
        socket.on("disconnect", () => {

            console.log(
                "User disconnected:",
                socket.id
            );

        });

    });

};

module.exports = setupSocketServer;
