import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import Message from './components/smallComponents/chatComponents/message';


function App() {
  return (

    
    <div class="mainContainer">
      <div id="main" class="text-center">
        <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
        <div id="messageBox" class=" messagesBox mx-auto h-75">
    {returnAllMesages()}
    {setChat()}
        </div>
        <div class="row sendMessageRow mx-auto h-20">
        <input type="text" placeholder="zadejte zprávu zde..." class=" send-message col-10 mx-auto h-20 "></input> 
        <button  class="btn btn-odeslat col-2 h-20"><i class="far fa-paper-plane"></i></button>
        </div>

      </div>
      <Sidebar></Sidebar>

    </div>


  );
}


function setChat(){
  $(function() {
    console.log($(".messagesBox").height());
    $(".messagesBox").scrollTop(102391203810938120938100);
  });

}

function returnAllMesages(){
  var arrOfMesages = [];
  var jsonData = getJSONData();
  for(let i = 0; i < jsonData.length; i++){
    if(i != jsonData.length-1){
      if(jsonData[i+1].mine != jsonData[i].mine){
        arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine } last={true} />)
      }else{
        arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine } last={false} />)
      }
    }else{
      arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine } last={true} />)
    }  
  }
  return arrOfMesages;
}

function getJSONData() {

  var returnData = false;

  $.ajax({
      url:"https://616fdd9623781c0017289677.mockapi.io/messages/messages",
      async: false,

      success: function (data) {
          returnData = data;
      }
  });
  return returnData;
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
    }else{
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
