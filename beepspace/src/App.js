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

const requestHandler = new RequestHandler();
const userController = new UserController();
const messageController = new MessageController();

var userHolder = "";

var index = 0;
let indexForRecieve = 1;

function App() {

  //check basic parameters for site
  checkIfReady();
  //connection to socket
  const socket = io("http://10.0.2.157:3001/");
  socket.on("connect", () => {
    if (userController.isLoggedIn()) {
      socket.emit("userJoin", {
        user: userController.getUser().username
      })
    }

  });

  //useStates for chat and chat settings
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState();
  const [modalShow, setModalShow] = useState(false);
  // function to handle sidebar user click
  const handleInputUser = (inputValue) => {
    socket.emit("joinChannel", { channel: inputValue });
    setChatUser(inputValue);
  }

  const setModalState = () => {
    setModalShow(!modalShow);
    console.log("test")
  }


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
    //let newMessageArray = messageController.pushNewMessage(content, true, messages);
    // setMessages([...newMessageArray]);
    setMessages(messages => [...messages, <Message content={content} owner={true} last={true} />])
    messageController.sendMessage(content, chatUser);

  }

  //prevent from user refreshing after click
  if (userHolder != chatUser && chatUser) {
    userHolder = chatUser;
    setMessages(getMessages(userController.getUser().username, chatUser))
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

  //rendering app
  return (

    <div class="mainContainer">
      {checkIfReady()}
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
        <ChatHandler messages={messages} chatUser={chatUser} />


        <TextInput chatUser={chatUser} sendMessageFunction={sendMessage} />


      </div>
      <Sidebar setModalShow={setModalState} socket={socket} handleInputUser={handleInputUser}></Sidebar>
      <FriendModal closeModal={setModalState} state={modalShow} />

    </div>


  );
}


function checkIfReady() {
  if (!userController.isLoggedIn() && window.location.pathname != "/login" && window.location.pathname != "/register") {
    window.location.replace("/login");
  }
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
