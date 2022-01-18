import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import ChatHandler from './Handlers/ChatHandler';
import { useState } from 'react';
import UserController from './Controllers/UserController';
import ParameterHandler from './Handlers/ParameterHandler';
import RequestHandler from './Handlers/RequestHandler';
import MessageController from './Controllers/MessageController';
import TextInput from './components/smallComponents/chatComponents/TextInput';
import { io } from "socket.io-client";
import Message from './components/smallComponents/chatComponents/message';
import FriendModal from './components/smallComponents/chatComponents/modal';
import NotificationsModal from './components/NotificationsModal';
import ModalInviteGroupchat from './components/smallComponents/modalInviteGroupchat';
import ModalGroupchat from './components/smallComponents/modalGroupchat';
import NotificationBox from './components/NotificationBox';
import UserList from './components/UserList';

const requestHandler = new RequestHandler();
const userController = new UserController();
var messageController = null;

var userHolder = "";
var isGroupchat =false;
var index = 0;
let indexForRecieve = 1;
var groupchatId;

function App() {

  //check basic parameters for site
  checkIfReady();
  //connection to socket
  const socket = io("http://10.0.2.15:3001/");
  messageController= new MessageController(socket);
  socket.on("connect", () => {
    if (userController.isLoggedIn()) {
      socket.emit("userJoin", {
        user: userController.getUser().username
      })
      requestHandler.jSONrequester("User", [
        new ParameterHandler("type", "SET-ONLINE"),
        new ParameterHandler("id", userController.getUser().id)
      ]);

    }

  });
  socket.on("disconnect", () => {
    requestHandler.jSONrequester("User", [
      new ParameterHandler("type", "SET-OFFLINE"),
      new ParameterHandler("id", userController.getUser().id)
    ]);
  });

  //useStates for chat and chat settings
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [NModalShow, setNModalShow] = useState(false);
  const [inviteModalShow,setInviteModalShow] = useState(false);
  const [createModalShow,setCreateModalShow] = useState(false);
  // function to handle sidebar user click
  const handleInputUser = (inputValue) => {
    isGroupchat = false;
    setChatUser(inputValue);
      requestHandler.jSONrequester("Groupchat",[
        new ParameterHandler("type","REMOVE-ACTIVE-USER"),
        new ParameterHandler("name", userController.getUser().username)
      ]);
      socket.emit("disconnectChanel",{
        channelID : groupchatId,
        user: userController.getUser().username
      })
    groupchatId = null;
    
  }

  const setModalState = () => {
    setModalShow(!modalShow);
  }
  const setAnotherModal = () =>{
    setNModalShow(!NModalShow);
  }

  const setCreateModalState = () =>{
    setCreateModalShow(!createModalShow);
  }
  const setInviteModalState = () =>{
    setInviteModalShow(!inviteModalShow);
  }
  window.onfocus = function () {
    socket.emit("userJoin", {
      user: userController.getUser().username
    })
    requestHandler.jSONrequester("User", [
      new ParameterHandler("type", "SET-ONLINE"),
      new ParameterHandler("id", userController.getUser().id)
    ]);
  };

  
  
  window.onblur = function () {
    requestHandler.jSONrequester("User", [
      new ParameterHandler("type", "SET-PAUSED"),
      new ParameterHandler("id", userController.getUser().id)
    ]);
    socket.emit("userPause", {
      user: userController.getUser().username
    });
  };


  
  //function for sending data to database and to socket
  const sendMessage = (content) => {
    console.log("send: " + messages)
    socket.emit("message2", {
      origin: userController.getUser().username,
      reciever: chatUser,
      content: content,
      index: index
    })
    index++;
    setMessages(messages => [...messages, <Message content={content} owner={true} last={true} />])
    messageController.sendMessage(content, chatUser);
    

    
  }
  //prevent from user refreshing after click
  if (userHolder != chatUser && chatUser) {
    userHolder = chatUser;
    if(isGroupchat){
    
      setMessages(getChatMessages(userController.getUser().username, groupchatId))
    }else{
      groupchatId = null;
      setMessages(getMessages(userController.getUser().username, chatUser))

    }
    
    
  }

  const sendGroupchatMessage = (content) =>{
   
    setMessages(messages => [...messages, <Message content={content} owner={true} last={true} />])
    messageController.sendGroupchatMessage(content, chatUser);
  }



  //socket rerender data
  socket.on("message2", function (data) {
    if (data.index != indexForRecieve) {
      if (data.origin == chatUser && data.reciever == userController.getUser().username) {
        if (chatUser != null && messages != null) {

          setMessages(messages => [...messages, <Message content={data.message} owner={false} last={true} />])
          indexForRecieve = data.index;

        }
      }
    }
  })

  const handleInputGroupchat = (groupchatID,groupchatName) =>{
    isGroupchat = true;
    requestHandler.jSONrequester("Groupchat",[
      new ParameterHandler("type","REMOVE-ACTIVE-USER"),
      new ParameterHandler("name", userController.getUser().username)
    ])
    groupchatId = groupchatID;
    setChatUser(groupchatName);
    requestHandler.jSONrequester("Groupchat",[
      new ParameterHandler("type","ADD-ACTIVE-USER"),
      new ParameterHandler("id",groupchatID),
      new ParameterHandler("name", userController.getUser().username)
    ])

    socket.emit("disconnectChanel",{
      channelID : groupchatId,
      user: userController.getUser().username
    })
    socket.emit("joinChanel",{
      channelID : groupchatID,
      user: userController.getUser()
    })
  }


  const renderChat = () =>{

    if(groupchatId != null){
      return( <div class="h-100 row">
      <div class="col col-md-9 h-100">
      <ChatHandler messages={messages} chatUser={chatUser} openInviteModal={setInviteModalState} isChatGroupchat={isGroupchat} />
      <TextInput chatUser={chatUser} sendMessageFunction={sendMessage} isChatMessage={isGroupchat} sendGroupchatMessage={sendGroupchatMessage} />
      </div>
      <div class=" col-md-3 h-100">
        <UserList handleInputUser={handleInputUser} socket={socket} groupchatID={groupchatId}/>
      </div>
      </div>)
    }
    return(<div class="h-100">
    <ChatHandler messages={messages} chatUser={chatUser} openInviteModal={setInviteModalState} isChatGroupchat={isGroupchat} />
      <TextInput chatUser={chatUser} sendMessageFunction={sendMessage} isChatMessage={isGroupchat} sendGroupchatMessage={sendGroupchatMessage} />
     
    </div>)
  }


  //rendering app
  return (
    <div class="mainContainer">
      {checkIfReady()}
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
       

       
      {renderChat()}

      

      </div>
      
      <Sidebar setModalShow={setModalState} setNModalShow={setAnotherModal} setCModalShow={setCreateModalState} socket={socket} handleInputUser={handleInputUser} handleInputGroupchat={handleInputGroupchat}></Sidebar>
      <FriendModal closeModal={setModalState} socket={socket} state={modalShow} />
      <NotificationsModal socket={socket} closeModal={setAnotherModal} state={NModalShow}/>
      <ModalInviteGroupchat groupchatID={groupchatId} socket={socket} closeModal={setInviteModalState} state={inviteModalShow}/>
      <ModalGroupchat closeModal={setCreateModalState} state={createModalShow} />
     
    </div>


  );
}


function checkIfReady() {
  if (!userController.isLoggedIn() && window.location.pathname != "/login" && window.location.pathname != "/register") {
    window.location.replace("/login");
  }
}

function getChatMessages(user, groupchatID){
  return messageController.returnAllMesages(requestHandler.jSONrequester("Message",[
    new ParameterHandler("user", user),
    new ParameterHandler("chatId", groupchatID),
    new ParameterHandler("isChatMessage",1)
  ]
    ))
}

function getMessages(user, reciever) {
  return messageController.returnAllMesages(requestHandler.jSONrequester("Message", [
    new ParameterHandler("user", user),
    new ParameterHandler("reciever", reciever)]))
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
