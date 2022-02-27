const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const axios = require('axios');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
});

var users = [];
var groupchats = [];

axios
  .get(
    'https://beepspaceapi.cekuj.net/BeepSpaceAPI/beepSpaceAPI/www/Groupchat?type=ALL-GROUPCHATS'
  )
  .then((res) => {
    groupchats = res.data;
  })
  .catch((error) => {
    console.error(error);
  });

io.on('connection', function (socket) {
  socket.on('joinChanel', function (data) {
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
  socket.on('disconnectChanel', function (data) {
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

  socket.on('createGroupchat', (data) => {
    if (!groupchats.some((item) => item.name == data.groupchatID)) {
      groupchats.push({
        id: data.groupchatID,
        name: data.name,
        color: data.color,
        users: data.users,
        connectedUsers: data.connectedUsers,
      });
      console.log(groupchats);
    }
    socket.broadcast.emit('groupchatCreated', {
      name: data.name,
      color: data.color,
      id: data.id,
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
    if (users.find((element) => element == data.user) == undefined) {
      users.push(data.user);
    }
    socket.broadcast.emit('clientOnline', {
      user: data.user,
    });
    socket.emit('clientOnline', {
      user: data.user,
    });
  });

  socket.on('message2', function (data) {
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
    users = users.filter((item) => item != data.user);
    socket.broadcast.emit('clientOffline', {
      user: data.user,
    });
    socket.emit('clientOffline', {
      user: data.user,
    });
    socket.disconnect();
  });

  socket.on('joinSpace', (data) => {
    socket.broadcast.emit('pickCall', {
      name: data.user,
    });

    socket.broadcast.emit('pickCall', {
      name: data.user,
    });
  });

  socket.on('leaveSpace', (data) => {
    socket.broadcast.emit('leaveCall', {
      name: data.user,
      belongsTo: data.connectTo,
    });
    socket.emit('leaveCall', {
      name: data.user,
      belongsTo: data.connectTo,
    });
  });
  socket.on('muteSelf', (data) => {
    socket.broadcast.emit('mute', {
      name: data.user,
      belongsTo: data.connectTo,
    });
    socket.emit('mute', {
      name: data.user,
      belongsTo: data.connectTo,
    });
  });

  socket.on('unmuteSelf', (data) => {
    socket.broadcast.emit('unmute', {
      name: data.user,
      belongsTo: data.connectTo,
    });
    socket.emit('unmute', {
      name: data.user,
      belongsTo: data.connectTo,
    });
  });
});

httpServer.listen(3001);
