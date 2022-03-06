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
  var currentUser = {
    name: '',
    userID: '',
    activeChannel: '',
  };

  socket.on('joinChanel', function (data) {
    socket.broadcast.emit('leaveCall', {
      name: data.user,
      belongsTo: data.connectTo,
    });
    socket.emit('leaveCall', {
      name: data.user,
      belongsTo: data.connectTo,
    });

    if (currentUser.activeChannel != '') {
      socket.leave(currentUser.activeChannel);
    }
    currentUser.activeChannel = '';
    users[
      users.indexOf(users.find((element) => element.name == currentUser.name))
    ].activeChannel = '';
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

  socket.on('radio', (data) => {
    socket.to(currentUser.activeChannel).emit('voice', data);
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

  socket.on('chatOpen', (data) => {
    if (currentUser.activeChannel != '') {
      socket.leave(currentUser.activeChannel);
    }
    currentUser.activeChannel = '';
    console.log(users);
    users[
      users.indexOf(users.find((element) => element.name == currentUser.name))
    ].activeChannel = '';
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
    if (!users.some((element) => element.name == data.user)) {
      users.push({
        name: data.user,
        userID: socket.id,
        activeChannel: '',
      });
      currentUser = {
        name: data.user,
        userID: socket.id,
        activeChannel: '',
      };
    } else {
      users[
        users.indexOf(users.find((element) => element.name == data.user))
      ] = {
        name: data.user,
        userID: socket.id,
        activeChannel: '',
      };
      currentUser = {
        name: data.user,
        userID: socket.id,
        activeChannel: '',
      };
    }
    socket.broadcast.emit('clientOnline', {
      user: data.user,
    });
    socket.emit('clientOnline', {
      user: data.user,
    });
  });

  socket.on('message2', function (data) {
    if (users.some((element) => data.reciever == element.name)) {
      socket
        .to(users.find((element) => data.reciever == element.name).userID)
        .emit('message2', {
          origin: data.origin,
          reciever: data.reciever,
          message: data.content,
          index: data.index,
        });
    }
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
    currentUser.activeChannel = data.connectTo;
    socket.join(currentUser.activeChannel);
    users[
      users.indexOf(users.find((element) => element.name == currentUser.name))
    ].activeChannel = data.connectTo;
    socket.broadcast.emit('pickCall', {
      name: data.user,
    });
    socket.emit('pickCall', {
      name: data.user,
      connectTo: data.connectTo,
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

    if (currentUser.activeChannel != '') {
      socket.leave(currentUser.activeChannel);
    }
    currentUser.activeChannel = '';
    users[
      users.indexOf(users.find((element) => element.name == currentUser.name))
    ].activeChannel = '';
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
