import UserController from "../../Controllers/UserController";
import SidebarUser from "./sidebarUser";
import { useState, forwardRef, useImperativeHandle } from "react";
import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
import { useEffect } from "react";
function SidebarGroupchat(props, ref) {


  const requestHandler = new RequestHandler();
  var rendered = false;
  var indexForUserUpdate = 0;
  const handleChange = () =>{
    props.handleInputGroupchat(props.groupchatID, props.name)
    props.userRemovingFunction(userController.getUser().username);
    setActiveUsers(activeUsers=>[...activeUsers,<div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser}  user={userController.getUser().username} online={true} socket={props.socket} reciever={userController.getUser().username} /></div>])
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
  useImperativeHandle(ref, () => ({
   removeActiveUserInChat(username){
   // setActiveUsers(activeUsers.filter(item => item.reciever == username))
  }

}), [])

useEffect(() => {
  console.log("test")
   
  props.socket.on("joinedChanel",function(data){
    
    if(data.channelID==props.groupchatID){
      setActiveUsers(activeUsers=>[...activeUsers,<div class="ml-3"><SidebarUser handleInputUser={props.handleInputUser}  user={userController.getUser().username} online={true} socket={props.socket} reciever={data.user.username} /></div>])
    }
  })

  props.socket.on("disconnectedChanel",function(data){
    if(data.channelID==props.groupchatID){
      setActiveUsers(activeUsers.filter(item => item.reciever == data.user.username))
    }
  })

});

  return (
    <div class="wholeSidebarGroupchat">
      <li ><a href="#" onClick={handleChange}>{props.name}<span></span></a></li>
            {activeUsers}
    </div>
  );
}


export default forwardRef(SidebarGroupchat)