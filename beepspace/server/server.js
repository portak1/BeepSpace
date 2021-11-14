const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("message", (arg) => {

});

io.emit("clientOnline",{

})

io.on('connection', function (socket) {
  // Set the initial channel for the socket
  // Just like you set the property of any
  // other object in javascript
  socket.channel = "";

  // When the client joins a channel, save it to the socket
  socket.on("joinChannel", function (data) {
      socket.channel = data.channel;
  });

  // When the client sends a message...
  socket.on("message", function (data) {
      // ...emit a "message" event to every other socket
      socket.broadcast.emit("message", {
          channel: socket.channel,
          message: data.message
      });
  });
});

httpServer.listen(3001);
