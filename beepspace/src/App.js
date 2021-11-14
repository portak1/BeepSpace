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

const requestHandler = new RequestHandler();
const userController = new UserController();
const messageController = new MessageController();

var userHolder = "";

function App() {
  checkIfReady();
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState();

  const handleInputUser = (inputValue) => {
    setChatUser(inputValue);
  }

  const socket = io("http://localhost:3001/");
    socket.on("connect", () => {
            
    });

  if (userHolder != chatUser && chatUser) {
    userHolder = chatUser;
    setMessages(getMessages(userController.getUser().username, chatUser))
  }

  return (
    
    <div class="mainContainer">
      {checkIfReady()}
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
        <ChatHandler messages={messages} chatUser={chatUser} />


        <TextInput />


      </div>
      <Sidebar handleInputUser={handleInputUser}></Sidebar>

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
