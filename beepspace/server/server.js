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


  socket.on("addUser",function(data){

    socket.broadcast.emit("addLocalUser",{
      origin: data.localUser,
      reciever: data.username
    } 
    )
  })

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

    socket.on("userPause",function(data){
      socket.broadcast.emit("clientPause", {
        user :data.user
      })
    })

    socket.on("disconnectUser",function(data){
      socket.broadcast.emit("clientOffline",{
        user : data.user
      })
      socket.disconnect();
    })

  });

httpServer.listen(3001);
