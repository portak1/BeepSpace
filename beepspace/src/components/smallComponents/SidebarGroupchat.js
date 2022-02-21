import UserController from "../../Controllers/UserController";
import SidebarUser from "./sidebarUser";
import { useState } from "react";
import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
import { useEffect } from "react";


export default function SidebarGroupchat(props) {

  useEffect(() => {

    props.socket.on("joinedChanel", function (data) {
      if (data.channelID == props.groupchatID) {
        if (!activeUsers.some((item) => {
          console.log(item.props.children.props.reciever);
          console.log(data.user.username);
          return item.props.children.props.reciever != data.user.username;
        })) {
          setActiveUsers(activeUsers => [...activeUsers, <div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser} user={userController.getUser().username} online={true} socket={props.socket} reciever={data.user.username} /></div>])
          console.log('connected')
        }
      }
    });
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
      <li ><a href="#" style={{ color: props.color }} onClick={handleChange}>{props.name}<span></span></a></li>
      {activeUsers}
    </div>
  );
}


