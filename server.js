
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlineUsers = 0;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API status route
app.get("/api/status", (req, res) => {
    res.json({
        message: "Chat server is running"
    });
});

// Handle user connections
io.on("connection", (socket) => {

    console.log("A user connected:", socket.id);

    onlineUsers++;

    io.emit("userCount", onlineUsers);

    // Notify other users when someone joins
    socket.broadcast.emit(
        "userStatus",
        "A user joined the chat"
    );

    // Receive and broadcast messages
    socket.on("chatMessage", (data) => {

        if (!data.username || !data.message) {
            return;
        }

        const chatData = {
            username: data.username,
            message: data.message,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        io.emit("chatMessage", chatData);

    });

    // Handle typing notifications
    socket.on("typing", () => {

        socket.broadcast.emit("typing");

    });

    // Handle stopped typing
    socket.on("stopTyping", () => {

        socket.broadcast.emit("stopTyping");

    });

    // Handle disconnection
    socket.on("disconnect", () => {

        console.log("A user disconnected:", socket.id);

        onlineUsers--;

        io.emit("userCount", onlineUsers);

        io.emit(
            "userStatus",
            "A user left the chat"
        );

    });

});

// Start server
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
