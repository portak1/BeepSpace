import UserController from "../../Controllers/UserController";
import SidebarUser from "./sidebarUser";
import { useState } from "react";
import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
export default function SidebarGroupchat(props) {


const requestHandler = new RequestHandler();
const rendered = false;
const handleChange = () => props.handleInputGroupchat(props.groupchatID, props.name)
const userController = new UserController();
var proxArr = requestHandler.jSONrequester("Groupchat",[
  new ParameterHandler("type","activeUsers"),
  new ParameterHandler("id", props.groupchatID)
]) 
const [activeUsers, setActiveUsers] = useState(generateArray(proxArr))

 
 const generateArray = (arr) => {
  if (!rendered) {
      rendered = true;
      return arr.map((data, id) => {
          var friendsState = requestHandler.jSONrequester("User", [
              new ParameterHandler("type", "IS-FRIENDS"),
              new ParameterHandler("id", userController.getUser().id),
              new ParameterHandler("id2", data.id)
          ])
          if (data.name != userController.getUser().username) {
              if (friendsState.state) {
                  return <SidebarUser handleInputUser={props.handleInputUser} key={id} user={userController.getUser().username} online={data.online} socket={props.socket} reciever={data.name} />
              }
          }
      })
  }
}

  return (
    <div class="wholeSidebarGroupchat">
      <li ><a href="#" onClick={handleChange}>{props.name}<span></span></a></li>
      <div class="ml-3"> <SidebarUser handleInputUser={props.handleInputUser} user={userController.getUser().username} online={true} socket={props.socket} reciever={"hrouzek"}/></div>
    </div>
  );
}