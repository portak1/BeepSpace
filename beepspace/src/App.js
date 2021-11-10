import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import ChatHandler from './Handlers/ChatHandler';
import { useState } from 'react';
import UserController from './Controllers/UserController';
const userController = new UserController();
if(!userController.isLoggedIn()&&window.location.pathname!="/login"&&window.location.pathname!="/register"){
  window.location.replace("/login");
}



function App() {

  const [chatUser, setChatUser] = useState();
  const handleInputUser = (inputValue) => {
    setChatUser({reciever:inputValue});
  }

  return (
    <div class="mainContainer">
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
        <ChatHandler chatUser = {chatUser}/>
        <div class="row sendMessageRow mx-auto h-20">
          
          <input type="text" placeholder="zadejte zprávu zde..." class=" send-message col-10 mx-auto h-20 "></input>
          <button  class="btn btn-odeslat col-2 h-20"><i class="far fa-paper-plane"></i></button>
        </div>

      </div>
      <Sidebar handleInputUser={handleInputUser}></Sidebar>

    </div>


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
