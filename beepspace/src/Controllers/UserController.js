import React from "react";
import Message from "../components/smallComponents/chatComponents/message";
import User from "../Entity/UserEntity";
class UserController extends React.Component {


  session = null;
  user = null;

  constructor() {
    super();
    this.session = window.sessionStorage;
  }



  logIn(username, email, number, birth) {
    this.user = new User(username, email, number, birth);
    this.session.setItem("user", JSON.stringify(this.user));
    
  }


  isLoggedIn() {
    if (this.session.getItem("user") != null) {
      return true;
    }
    return false;
  }

  

  logOut() {
    this.session.setItem("user", null);
    this.user = null;
  }

  getUser(){
    return JSON.parse(this.session.getItem("user"));
  }

  relocate(location) {
    window.location.replace(location);

  }
}


export default UserController;