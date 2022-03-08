import { useEffect, useState } from "react";
import RequestHandler from '../Handlers/RequestHandler';
import ParameterHandler from '../Handlers/ParameterHandler';
import UserController from "../Controllers/UserController";
import UserListUser from "./UserListUser";

const userController = new UserController();
const requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
var listbarUsers = [];
export default function UserList(props) {
  const [listbarUsers, setListbarUsers] = useState();


  useEffect(() => {
    var userArray;
    requestHandler.jSONrequester("Groupchat", [
      new ParameterHandler("type", "GET-GROUPCHAT"),
      new ParameterHandler("id", props.groupchatID)
    ]).then((data)=>{
      userArray = Array.from(data.users.split(","));
    }).then(()=>{
      Promise.all(userArray.map((data, id) => {
        return requestHandler.jSONrequester("User", [
          new ParameterHandler("type", "ONE-BY-ID"),
          new ParameterHandler("id", data)
        ]).then((data)=>{
         return <UserListUser handleInputUser={props.handleInputUser} key={id} user={data.name} />
        })
      })).then((data)=>{
        setListbarUsers(data);
      })
    });

    
  }, [props.groupchatID])



  useEffect(() => {
    props.socket.on("addUserToGroupchat", (data) => {
      console.log('sff');
      if (data.channelID == props.groupchatID) {
        setListbarUsers(listbarUsers => [...listbarUsers, <UserListUser handleInputUser={props.handleInputUser} user={data.user} />])
      }
    })
  }, [])

  return (
    <div className="userList">
      <div className="nadpis text-center">
        <h2>Seznam uživatelů</h2>
      </div>
      {listbarUsers}


    </div>
  );
}