import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import Message from './components/smallComponents/chatComponents/message';
import RequestHandler from './Handlers/RequestHandler';
import ParameterHandler from './Handlers/ParameterHandler';
import MessageController from './Controllers/MessageController';


const requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
const messageController = new MessageController;
function App() {

  return (
    <div class="mainContainer">
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
        <div id="messageBox" class=" messagesBox mx-auto h-75">
          {messageController.returnAllMesages(requestHandler.jSONrequester("Message", [new ParameterHandler("user", "morzi")]))}

          {setChat()}
        </div>
        <div class="row sendMessageRow mx-auto h-20">
          <input type="text" placeholder="zadejte zprávu zde..." class=" send-message col-10 mx-auto h-20 "></input>
          <button class="btn btn-odeslat col-2 h-20"><i class="far fa-paper-plane"></i></button>
        </div>

      </div>
      <Sidebar></Sidebar>

    </div>


  );
}


function setChat() {
  $(function () {
    console.log($(".messagesBox").height());
    $(".messagesBox").scrollTop(102391203810938120938100);
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
