import ChatHandler from "../../Handlers/ChatHandler";



var user;
var reciever;
const chatHandler = new ChatHandler();

function SidebarUser(props) {

    user = props.user;
    reciever = props.reciever;

    return (
        <li><button className="userButton" onClick={fillChat}><span class="ball green"></span>{reciever}</button></li>
    );
}

function fillChat(){
    chatHandler.fillChat(user,reciever);
}

export default SidebarUser;