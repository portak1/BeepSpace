import React from "react";
import User from "../Entity/UserEntity";
class UserController extends React.Component {

  
  constructor() {
    super();
  }



  logIn(username, email, number, birth) {
    this.user = new User(username, email, number, birth);
    window.sessionStorage.setItem("user", JSON.stringify(this.user));   
      window.location.replace("/");

    
  }


  isLoggedIn() {
    if (window.sessionStorage.getItem("user") != null) {
      return true;
    }
    return false;
  }

  

  logOut() {
    window.sessionStorage.setItem("user", null);
    window.location.replace("/login");
  }

  getUser(){
    if(this.isLoggedIn()){
      return JSON.parse(window.sessionStorage.getItem("user"));
    }else{
      window.location.replace("/login");

    }
  }

  
}


export default UserController;