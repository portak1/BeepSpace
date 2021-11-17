const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
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
      console.log(socket.channel);
  });

  // When the client sends a message...
  socket.on("message2", function (data) {
    console.log(data);
    console.log(socket.channel)
      socket.broadcast.emit("message2", {
          origin: data.origin,
          reciever: data.reciever,
          message: data.content,
          index: data.index
      });

  });
});

httpServer.listen(3001);
