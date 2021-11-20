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




io.on('connection', function (socket) {
  
  socket.channel = "";

  socket.on("joinChannel", function (data) {
      socket.channel = data.channel;
  });


  socket.on("userJoin",function(data){
    socket.broadcast.emit("clientOnline",{
      user: data.user
    })
  })

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
