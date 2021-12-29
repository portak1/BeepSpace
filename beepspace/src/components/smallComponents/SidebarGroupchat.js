import UserController from "../../Controllers/UserController";
import SidebarUser from "./sidebarUser";
import { useState } from "react";
import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
export default function SidebarGroupchat(props) {


  const requestHandler = new RequestHandler();
  var rendered = false;
  const handleChange = () => props.handleInputGroupchat(props.groupchatID, props.name)
  const userController = new UserController();
  var proxArr = requestHandler.jSONrequester("Groupchat", [
    new ParameterHandler("type", "ACTIVE-USERS"),
    new ParameterHandler("id", props.groupchatID)
  ])

  
  const generateArray = (arr) => {
    if (!rendered) {
      rendered = true;
      return arr.map((data, id) => {
        console.log(data);
        return <div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser} key={id} user={userController.getUser().username} online={data.online} socket={props.socket} reciever={data.name} /></div>

      })
    }
  }

  const [activeUsers, setActiveUsers] = useState(generateArray(proxArr))


  return (
    <div class="wholeSidebarGroupchat">
      <li ><a href="#" onClick={handleChange}>{props.name}<span></span></a></li>
            {activeUsers}
    </div>
  );
}