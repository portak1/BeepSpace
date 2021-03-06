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
import { ToastContainer, toast } from 'react-toastify';
import useSound from 'use-sound';
import UserList from './components/UserList';
import 'react-toastify/dist/ReactToastify.css';
import notificatinoSound from './storage/sounds/notif.mp3';
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
  socket = io('https://beepspace-app.ey.r.appspot.com');
}

function App() {
  const [playNotificationSound] = useSound(notificatinoSound);

  //check basic parameters for site
  checkIfReady();
  //connection to socket
  messageController = new MessageController(socket);

  //useStates for chat and chat settings
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [NModalShow, setNModalShow] = useState(false);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [isGroupchat, setIsGroupchat] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [muted, setMuted] = useState(false);
  const chatUserRef = useRef(chatUser);
  chatUserRef.current = chatUser;
  const mutedRef = useRef(muted);
  const isConnectedRef = useRef(isConnected);
  isConnectedRef.current = isConnected;
  mutedRef.current = muted;

  useEffect(() => {
    socket.on('connect', () => {
      if (userController.isLoggedIn()) {
        socket.emit('userJoin', {
          user: userController.getUser().username,
          id: userController.getUser().id,
        });
        requestHandler.jSONrequester('User', [
          new ParameterHandler('type', 'SET-ONLINE'),
          new ParameterHandler('id', userController.getUser().id),
        ]);
      }
    });

    socket.on('succesfullConnection', () => {
      setInterval(async () => {
        socket.emit('heartbeat');
      }, 249);
    });

    navigator.mediaDevices.getUserMedia({ audio: true }).then((data) => {
      var mediaRecorder = new MediaRecorder(data);

      mediaRecorder.onstart = function (e) {
        soundChunks = [];
      };
      mediaRecorder.ondataavailable = function (e) {
        soundChunks.push(e.data);
      };
      mediaRecorder.onstop = function (e) {
        var blob = new Blob(soundChunks, { type: 'audio/ogg; codecs=opus' });
        socket.emit('radio', blob);
      };

      // Start recording
      mediaRecorder.start();
      setInterval(function () {
        if (isConnectedRef.current && !mutedRef.current) {
          if (mediaRecorder.state == 'inactive') {
            mediaRecorder.start();
            setTimeout(() => {}, 500);
          }

          mediaRecorder.stop();
          mediaRecorder.start();
        } else {
          if (mediaRecorder.state == 'recording') {
            mediaRecorder.stop();
          }
        }
      }, 500);
    });

    socket.on('voice', function (arrayBuffer) {
      if (isConnectedRef.current) {
        soundBlob = new Blob([arrayBuffer], { type: 'audio/ogg; codecs=opus' });

        var audio = new Audio(window.URL.createObjectURL(soundBlob));
        audio.play();
      }
    });

    document.addEventListener('touchstart', function () {
      document.getElementsByTagName('audio')[0].play();
      document.getElementsByTagName('audio')[0].pause();
    });

    socket.on('disconnect', () => {
      requestHandler.jSONrequester('User', [
        new ParameterHandler('type', 'SET-OFFLINE'),
        new ParameterHandler('id', userController.getUser().id),
      ]);
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

    socket.on('newNotification', function (data) {
      playNotificationSound();
      if (data.reciever == userController.getUser().username) {
        if (data.type == 'message') {
          if (data.origin == chatUserRef.current) return;
          toast('???? nov?? zpr??va od ' + data.origin + '!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else if (data.type == 'invite') {
          toast(' ??????? nov?? pozv??nka do ' + data.content + '!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          toast(data.content, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
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
      id: userController.getUser().id,
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
      getChatMessages(userController.getUser().username, groupchatId).then(
        (data) => {
          setMessages(data);
        }
      );
    } else {
      groupchatId = null;
      getMessages(userController.getUser().username, chatUser).then((data) => {
        setMessages(data);
      });
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
    requestHandler
      .jSONrequester('Groupchat', [
        new ParameterHandler('type', 'REMOVE-ACTIVE-USER'),
        new ParameterHandler('name', userController.getUser().username),
      ])
      .then(() => {
        groupchatId = groupchatID;
        setChatUser(groupchatName);
        requestHandler
          .jSONrequester('Groupchat', [
            new ParameterHandler('type', 'ADD-ACTIVE-USER'),
            new ParameterHandler('id', groupchatID),
            new ParameterHandler('name', userController.getUser().username),
          ])
          .then(() => {
            socket.emit('disconnectChanel', {
              channelID: groupchatName,
              user: userController.getUser().username,
            });
            socket.emit('joinChanel', {
              channelID: groupchatName,
              user: userController.getUser().username,
            });
          });
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
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
  return requestHandler
    .jSONrequester('Message', [
      new ParameterHandler('user', user),
      new ParameterHandler('chatId', groupchatID),
      new ParameterHandler('isChatMessage', 1),
    ])
    .then((data) => {
      return messageController.returnAllMesages(data).then((data) => {
        return data;
      });
    });
}

function getMessages(user, reciever) {
  return requestHandler
    .jSONrequester('Message', [
      new ParameterHandler('user', user),
      new ParameterHandler('reciever', reciever),
    ])
    .then((data) => {
      return messageController.returnAllMesages(data);
    });
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
