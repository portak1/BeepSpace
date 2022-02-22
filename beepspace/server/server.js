const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', function (socket) {
  socket.on('joinChanel', function (data) {
    console.log('join channel ' + data.channelID);
    socket.join(data.channelID);
    socket.broadcast.emit('joinedChannel', {
      channelID: data.channelID,
      user: data.user,
    });
    socket.emit('joinedChannel', {
      channelID: data.channelID,
      user: data.user,
    });
  });

  socket.on('join-room', (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });
  socket.on('disconnectChanel', function (data) {
    socket.disconnect(data.channelID);
    console.log(data.user + ' disconnected from ' + data.channelID);
    socket.emit('disconnectedChanel', {
      channelID: data.channelID,
      user: data.user,
    });
    socket.broadcast.emit('disconnectedChanel', {
      channelID: data.channelID,
      user: data.user,
    });
  });
  socket.on('addChannel', (data) => {
    socket.broadcast.emit('addUserToGroupchat', {
      user: data.localUser,
      channelID: data.channel,
    });
    socket.emit('addLocalChannel', {
      channel: data.channel,
    });
  });

  socket.on('chatOpen', (data) => {
    socket.emit('removeNotifications', {
      user: data.user,
    });
  });

  socket.on('unfriend', (data) => {
    socket.broadcast.emit('removeFriend', {
      origin: data.user,
      reciever: data.reciever,
    });
  });

  socket.on('notification', function (data) {
    socket.broadcast.emit('newNotification', {
      reciever: data.reciever,
      origin: data.origin,
      type: data.type,
      content: data.content,
      date: data.date,
      groupchatID: data.groupchatID,
    });
  });

  socket.on('addUser', function (data) {
    socket.broadcast.emit('addLocalUser', {
      origin: data.localUser,
      reciever: data.username,
    });

    socket.emit('addLocalUser', {
      origin: data.username,
      reciever: data.localUser,
    });
  });

  socket.on('userJoin', function (data) {
    socket.broadcast.emit('clientOnline', {
      user: data.user,
    });
    socket.emit('clientOnline', {
      user: data.user,
    });
  });

  socket.on('message2', function (data) {
    console.log(data);
    console.log(socket.channel);
    socket.broadcast.emit('message2', {
      origin: data.origin,
      reciever: data.reciever,
      message: data.content,
      index: data.index,
    });
  });

  socket.on('userPause', function (data) {
    socket.broadcast.emit('clientPause', {
      user: data.user,
    });
    socket.emit('clientPause', {
      user: data.user,
    });
  });

  socket.on('disconnectUser', function (data) {
    socket.broadcast.emit('clientOffline', {
      user: data.user,
    });
    socket.emit('clientOffline', {
      user: data.user,
    });
    socket.disconnect();
  });
});

httpServer.listen(3001);
