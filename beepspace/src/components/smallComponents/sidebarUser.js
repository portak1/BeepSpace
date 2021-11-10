import ChatHandler from "../../Handlers/ChatHandler";



var user;
var reciever;
var chatHandler;
function SidebarUser(props) {

    user = props.user;
    reciever = props.reciever;
    chatHandler = props.chatHandler;
   const handleChange= () => props.handleInputUser(props.reciever);
     
    return (
        <li><a className="userButton"  onClick={handleChange}><span class="ball pink"></span>{reciever}</a></li>
    );

}



export default SidebarUser;