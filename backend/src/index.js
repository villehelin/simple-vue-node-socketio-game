const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

var position = {
    x:200,
    y:200
}

io.on("connection", socket =>{
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });


    socket.emit("position", position);
    
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x = position.x - 5;
                io.emit("position", position);
                break;
            case "right":
                position.x = position.x + 5;
                io.emit("position", position);
                break;
            case "up":
                position.y = position.y - 5;
                io.emit("position", position);
                break;
            case "down":
                position.y = position.y + 5;
                io.emit("position", position);
                break;
            }
    });
});

var PORT = 3000;

server.listen(PORT, () =>{ console.log("Server running on port" , PORT); });