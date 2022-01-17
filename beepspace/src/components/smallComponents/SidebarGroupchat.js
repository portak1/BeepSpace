import UserController from "../../Controllers/UserController";
import SidebarUser from "./sidebarUser";
import { useState, forwardRef, useImperativeHandle } from "react";
import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
import { useEffect } from "react";


export default function SidebarGroupchat(props) {

  useEffect(() => {
    props.socket.on("joinedChanel", function (data) {
      if (data.channelID == props.groupchatID) {
        setActiveUsers(activeUsers => [...activeUsers, <div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser} user={userController.getUser().username} online={true} socket={props.socket} reciever={data.user.username} /></div>])
      }
    })

    props.socket.on("disconnectedChanel", function (data) {
       setActiveUsers(activeUsers.filter(pepegac => pepegac.reciever==data.user))
      
      
    })
  }, []);



  const requestHandler = new RequestHandler();
  var rendered = false;
  var indexForUserUpdate = 0;
  const handleChange = () => {
    props.handleInputGroupchat(props.groupchatID, props.name)
   // setActiveUsers(activeUsers => [...activeUsers, <div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser} user={userController.getUser().username} online={true} socket={props.socket} reciever={userController.getUser().username} /></div>])
  }
  const userController = new UserController();
  var proxArr = requestHandler.jSONrequester("Groupchat", [
    new ParameterHandler("type", "ACTIVE-USERS"),
    new ParameterHandler("id", props.groupchatID)
  ])


  const generateArray = (arr) => {
    if (!rendered) {
      rendered = true;
      return arr.map((data, id) => {
        return <div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser} key={id} user={userController.getUser().username} online={true} socket={props.socket} reciever={data.name} /></div>

      })
    }
  }

  const [activeUsers, setActiveUsers] = useState(generateArray(proxArr))



  return (
    <div class="wholeSidebarGroupchat">
      <li ><a href="#" style={{color:props.color}} onClick={handleChange}>{props.name}<span></span></a></li>
      {activeUsers}
    </div>
  );
}


