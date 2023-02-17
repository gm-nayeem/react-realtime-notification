// import socket server
const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:3000",
    }
});


let onlineUsers = [];

// add new user
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
        onlineUsers.push({ username, socketId });
};

// remove user
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// get user
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};

// socket connection
io.on("connection", (socket) => {
    // when user connect
    console.log("a user connect!");

    // add new user
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
    });

    // send notification
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        io.to(receiver?.socketId).emit("getNotification", {
            senderName,
            type,
        });
    });

    // send message
    socket.on("sendText", ({ senderName, receiverName, text }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getText", {
            senderName,
            text,
        });
    });

    // when user disconnect, remove user
    socket.on("disconnect", () => {
        console.log("a user disconnect!");
        removeUser(socket.id);
    });
});
