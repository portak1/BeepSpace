import React from "react";
import User from "../Entity/UserEntity";
import RequestHandler from "../Handlers/RequestHandler";
import ParameterHandler from "../Handlers/ParameterHandler";
class UserController extends React.Component {


  constructor() {
    super();
    this.requestHandler = new RequestHandler();
  }



  logIn(username, email, number, birth, id) {
    this.user = new User(username, email, number, birth, id);
    window.sessionStorage.setItem("user", JSON.stringify(this.user));
    window.location.replace("/");


  }


  isLoggedIn() {
    if (window.sessionStorage.getItem("user") != null) {
      return true;
    }
    return false;
  }



  logOut(socket) {
    this.requestHandler.jSONrequester("User", [
      new ParameterHandler("type", "SET-OFFLINE"),
      new ParameterHandler("id", this.getUser().id)
    ]);
    socket.emit("disconnectUser", {
      user: this.getUser().username
    });
    window.sessionStorage.setItem("user", null);
    window.location.replace("/login");
  }



  getUser() {
    if (this.isLoggedIn()) {
      return JSON.parse(window.sessionStorage.getItem("user"));
    } else {
      window.location.replace("/login");

    }
  }


}


export default UserController;