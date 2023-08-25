const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
    const allUser = [];
    console.log(`New client is connected with id: ${socket.id}`);

    socket.on("disconnect", () => console.log("disconnected"));

    socket.on("join-room", ({ username, room }) => {
        socket.join(room);
    });

    socket.on("send-msg", ({ user, msg, room, time }) => {
        socket.to(room).emit("broadcast", {
            user,
            msg,
            time,
        });
    });
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
