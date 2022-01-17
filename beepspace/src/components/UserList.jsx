import { useEffect,useState } from "react";
import RequestHandler from '../Handlers/RequestHandler';
import ParameterHandler from '../Handlers/ParameterHandler';
import UserController from "../Controllers/UserController";
import UserListUser from "./UserListUser";

const userController = new UserController();
const requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
var groupchat = null;
var listbarUsers = [];
export default function UserList(props){

    groupchat = requestHandler.jSONrequester("Groupchat",[
        new ParameterHandler("type", "GET-GROUPCHAT"),
        new ParameterHandler("id", props.groupchatID)
    ])
    
  const userArray = Array.from(groupchat.users.split(","));
    
  listbarUsers = userArray.map((data, id) => {
    var proxUser = requestHandler.jSONrequester("User",[
        new ParameterHandler("type", "ONE-BY-ID"),
        new ParameterHandler("id", data)
    ]);
    return <UserListUser handleInputUser={props.handleInputUser} key={id} user={proxUser.name} />
  })
  


    return(
        <div className="userList">
            <div className="nadpis text-center">
                <h2>Seznam uživatelů</h2>
            </div>

          {listbarUsers}


        </div>
    );
}