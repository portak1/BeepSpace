import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import ChatHandler from './Handlers/ChatHandler';
import { useState, useRef, useEffect } from 'react';
import UserController from './Controllers/UserController';
import ParameterHandler from './Handlers/ParameterHandler';
import RequestHandler from './Handlers/RequestHandler';
import MessageController from './Controllers/MessageController';
import TextInput from './components/smallComponents/chatComponents/TextInput';
import { io } from 'socket.io-client';
import Message from './components/smallComponents/chatComponents/message';
import FriendModal from './components/smallComponents/chatComponents/modal';
import NotificationsModal from './components/NotificationsModal';
import ModalInviteGroupchat from './components/smallComponents/modalInviteGroupchat';
import ModalGroupchat from './components/smallComponents/modalGroupchat';
import UserList from './components/UserList';
import { enviroment } from './enviroments/enviroment';
const requestHandler = new RequestHandler();
const userController = new UserController();

var messageController = null;

var userHolder = '';
var index = 0;
let indexForRecieve = 1;
var groupchatId;
var socket;
let soundChunks = [];
var soundBlob;
if (userController.isLoggedIn()) {
  socket = io(
    'https://3001-5ea33ff2-d036-412a-b418-36b590421303.cs-europe-west4-bhnf.cloudshell.dev/'
  );
}

function App() {
  //check basic parameters for site
  checkIfReady();
  //connection to socket
  messageController = new MessageController(socket);
  socket.on('connect', () => {
    if (userController.isLoggedIn()) {
      socket.emit('userJoin', {
        user: userController.getUser().username,
      });
      requestHandler.jSONrequester('User', [
        new ParameterHandler('type', 'SET-ONLINE'),
        new ParameterHandler('id', userController.getUser().id),
      ]);
    }
  });
  socket.on('disconnect', () => {
    requestHandler.jSONrequester('User', [
      new ParameterHandler('type', 'SET-OFFLINE'),
      new ParameterHandler('id', userController.getUser().id),
    ]);
  });

  //useStates for chat and chat settings
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [NModalShow, setNModalShow] = useState(false);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [isGroupchat, setIsGroupchat] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);
  const isConnectedRef = useRef(isConnected);
  isConnectedRef.current = isConnected;
  mutedRef.current = muted;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((data) => {
      var mediaRecorder = new MediaRecorder(data);

      mediaRecorder.onstart = function (e) {
        soundChunks = [];
      };
      mediaRecorder.ondataavailable = function (e) {
        if (isConnectedRef.current && !mutedRef.current) {
          soundChunks.push(e.data);
        } else {
          soundChunks = [];
        }
      };
      mediaRecorder.onstop = function (e) {
        if (isConnectedRef.current && !mutedRef.current) {
          console.log('test');
          var blob = new Blob(soundChunks, { type: 'audio/ogg; codecs=opus' });
          socket.emit('radio', blob);
        }
      };

      // Start recording
      mediaRecorder.start();
      setInterval(function () {
        if (isConnectedRef.current && !mutedRef.current) {
          mediaRecorder.stop();
          mediaRecorder.start();
        }
      }, 250);
    });
    socket.on('voice', function (arrayBuffer) {
      if (isConnectedRef.current) {
        soundBlob = new Blob([arrayBuffer], { type: 'audio/ogg; codecs=opus' });
        var audio = document.createElement('audio');
        audio.src = window.URL.createObjectURL(soundBlob);
        audio.play();
      }
    });

    socket.on('pickCall', (data) => {
      if (data.name == userController.getUser().username) {
        soundBlob = null;
        setIsConnected(true);
      }
    });
    socket.on('leaveCall', (data) => {
      if (data.name == userController.getUser().username) {
        soundBlob = null;
        setIsConnected(false);
      }
    });
    socket.on('mute', (data) => {
      if (data.name == userController.getUser().username) {
        soundBlob = null;
        setMuted(true);
      }
    });
    socket.on('unmute', (data) => {
      if (data.name == userController.getUser().username) {
        soundBlob = null;
        setMuted(false);
      }
    });
  }, []);

  // function to handle sidebar user click
  const handleInputUser = (inputValue) => {
    setIsGroupchat(false);
    setChatUser(inputValue);
    requestHandler.jSONrequester('Groupchat', [
      new ParameterHandler('type', 'REMOVE-ACTIVE-USER'),
      new ParameterHandler('name', userController.getUser().username),
    ]);
    socket.emit('disconnectChanel', {
      channelID: groupchatId,
      user: userController.getUser().username,
    });
    groupchatId = null;
    socket.emit('chatOpen', {
      user: inputValue,
    });
  };

  const setModalState = () => {
    setModalShow(!modalShow);
  };
  const setAnotherModal = () => {
    setNModalShow(!NModalShow);
  };

  const setCreateModalState = () => {
    setCreateModalShow(!createModalShow);
  };
  const setInviteModalState = () => {
    setInviteModalShow(!inviteModalShow);
  };
  window.onfocus = function () {
    socket.emit('userJoin', {
      user: userController.getUser().username,
    });
    requestHandler.jSONrequester('User', [
      new ParameterHandler('type', 'SET-ONLINE'),
      new ParameterHandler('id', userController.getUser().id),
    ]);
  };

  window.onblur = function () {
    requestHandler.jSONrequester('User', [
      new ParameterHandler('type', 'SET-PAUSE'),
      new ParameterHandler('id', userController.getUser().id),
    ]);
    socket.emit('userPause', {
      user: userController.getUser().username,
    });
  };

  //function for sending data to database and to socket
  const sendMessage = (content) => {
    socket.emit('message2', {
      origin: userController.getUser().username,
      reciever: chatUser,
      content: content,
      index: index,
    });
    index++;
    setMessages((messages) => [
      ...messages,
      <Message content={content} owner={true} last={true} />,
    ]);
    messageController.sendMessage(content, chatUser);
  };

  //prevent from user refreshing after click
  if (userHolder != chatUser && chatUser) {
    userHolder = chatUser;
    if (isGroupchat) {
      setMessages(
        getChatMessages(userController.getUser().username, groupchatId)
      );
    } else {
      groupchatId = null;
      setMessages(getMessages(userController.getUser().username, chatUser));
    }
  }

  const sendGroupchatMessage = (content) => {
    setMessages((messages) => [
      ...messages,
      <Message content={content} owner={true} last={true} />,
    ]);
    messageController.sendGroupchatMessage(content, chatUser);
  };

  //socket rerender data
  socket.on('message2', function (data) {
    if (data.index != indexForRecieve) {
      if (
        data.origin == chatUser &&
        data.reciever == userController.getUser().username
      ) {
        if (chatUser != null && messages != null) {
          setMessages((messages) => [
            ...messages,
            <Message content={data.message} owner={false} last={true} />,
          ]);
          indexForRecieve = data.index;
        }
      }
    }
  });

  const handleInputGroupchat = (groupchatID, groupchatName) => {
    setIsGroupchat(true);
    requestHandler.jSONrequester('Groupchat', [
      new ParameterHandler('type', 'REMOVE-ACTIVE-USER'),
      new ParameterHandler('name', userController.getUser().username),
    ]);
    groupchatId = groupchatID;
    setChatUser(groupchatName);
    requestHandler.jSONrequester('Groupchat', [
      new ParameterHandler('type', 'ADD-ACTIVE-USER'),
      new ParameterHandler('id', groupchatID),
      new ParameterHandler('name', userController.getUser().username),
    ]);

    socket.emit('disconnectChanel', {
      channelID: groupchatName,
      user: userController.getUser().username,
    });
    socket.emit('joinChanel', {
      channelID: groupchatName,
      user: userController.getUser().username,
    });
  };

  const renderChat = () => {
    if (groupchatId != null) {
      return (
        <div class='h-100 row'>
          <div class='col col-md-9 h-100'>
            <ChatHandler
              messages={messages}
              chatUser={chatUser}
              openInviteModal={setInviteModalState}
              isChatGroupchat={isGroupchat}
            />
            <TextInput
              chatUser={chatUser}
              sendMessageFunction={sendMessage}
              isChatMessage={isGroupchat}
              sendGroupchatMessage={sendGroupchatMessage}
            />
          </div>
          <div class=' col-md-3 h-100'>
            <UserList
              handleInputUser={handleInputUser}
              socket={socket}
              groupchatID={groupchatId}
            />
          </div>
        </div>
      );
    }
    return (
      <div class='h-100'>
        <ChatHandler
          messages={messages}
          socket={socket}
          chatUser={chatUser}
          handleInputUser={handleInputUser}
          openInviteModal={setInviteModalState}
          isChatGroupchat={isGroupchat}
        />
        <TextInput
          chatUser={chatUser}
          sendMessageFunction={sendMessage}
          isChatMessage={isGroupchat}
          sendGroupchatMessage={sendGroupchatMessage}
        />
      </div>
    );
  };

  //rendering app
  return (
    <div class='mainContainer'>
      {checkIfReady()}
      <div id='main' class='text-center'>
        <a class='sidebar-toggle-btn trigger-toggle-sidebar'>
          <span class='line'></span>
          <span class='line'></span>
          <span class='line'></span>
          <span class='line line-angle1'></span>
          <span class='line line-angle2'></span>
        </a>

        {renderChat()}
      </div>

      <Sidebar
        setModalShow={setModalState}
        setNModalShow={setAnotherModal}
        setCModalShow={setCreateModalState}
        socket={socket}
        handleInputUser={handleInputUser}
        handleInputGroupchat={handleInputGroupchat}
        isGroupchat={isGroupchat}
        activeUser={chatUser}
      ></Sidebar>
      <FriendModal
        closeModal={setModalState}
        socket={socket}
        state={modalShow}
      />
      <NotificationsModal
        socket={socket}
        closeModal={setAnotherModal}
        state={NModalShow}
      />
      <ModalInviteGroupchat
        groupchatID={groupchatId}
        socket={socket}
        closeModal={setInviteModalState}
        state={inviteModalShow}
      />
      <ModalGroupchat
        closeModal={setCreateModalState}
        state={createModalShow}
        socket={socket}
      />
    </div>
  );
}

function checkIfReady() {
  if (
    !userController.isLoggedIn() &&
    window.location.pathname != '/login' &&
    window.location.pathname != '/register'
  ) {
    window.location.replace('/login');
  }
}

function getChatMessages(user, groupchatID) {
  return messageController.returnAllMesages(
    requestHandler.jSONrequester('Message', [
      new ParameterHandler('user', user),
      new ParameterHandler('chatId', groupchatID),
      new ParameterHandler('isChatMessage', 1),
    ])
  );
}

function getMessages(user, reciever) {
  return messageController.returnAllMesages(
    requestHandler.jSONrequester('Message', [
      new ParameterHandler('user', user),
      new ParameterHandler('reciever', reciever),
    ])
  );
}

$(document).ready(function ($) {
  var cols = {},
    messageIsOpen = false;

  cols.showSidebar = function () {
    $('body').addClass('show-sidebar');
  };
  cols.hideSidebar = function () {
    $('body').removeClass('show-sidebar');
  };

  $('.trigger-toggle-sidebar').on('click', function () {
    if (!$('body').hasClass('show-sidebar')) {
      cols.showSidebar();
    } else {
      cols.hideSidebar();
    }
  });

  $('.crossIcon').on('click', function () {
    cols.hideSidebar();
  });

  if ($('body').hasClass('show-sidebar')) {
    $('#main').on('click', function () {
      cols.hideSidebar();
    });
  }
});

export default App;
