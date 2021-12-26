import React, { Component } from "react";
import $ from 'jquery'
import UserController from "../Controllers/UserController";
import RequestHandler from "./RequestHandler";
import MessageController from "../Controllers/MessageController";
import ParameterHandler from "./ParameterHandler";

class ChatHandler extends Component {
    userController = new UserController();
    requestHandler = new RequestHandler();
    messageController = new MessageController();
    chat = [];

    constructor() {
        super();

    }

    openInviteModal =() => this.props.openInviteModal();


    render() {

        var userRmvButton = "";
        var userLeaveGroup = "";
        var userInviteButton = "";
        if(this.props.chatUser){
            if(!this.props.isChatGroupchat){
                userRmvButton= <div class="col-md-2 col-4"><button class="btn topBoxButton buttonCustom"><i class="fas fa-users-slash"></i></button></div>;
            }else{
                userLeaveGroup = <div class="col-md-2 col-4"><button class="btn topBoxButton buttonCustom"><i class="fas fa-users-slash"></i></button></div>;
                userInviteButton= <div class="col-md-2 col-4"><button onClick={this.openInviteModal} class="btn topBoxButton buttonCustom"><i class="fas fa-user-plus"></i></button></div>;
         
            }
        }


        return (

            <div class="h-75">
                <div class="nameBox row mx-auto ">
                    
                    { !this.props.isChatGroupchat ? <div class="col-md-10 col-8 text-left"><h3 class="buttonCustom jmeno">{this.props.chatUser}</h3></div> :  <div class="col-md-8 col-4 text-left"><h3 class="buttonCustom jmeno">{this.props.chatUser}</h3></div>}
                    {userRmvButton}                    
                    {userLeaveGroup}
                    {userInviteButton}
                </div>
                <div id="messageBox" class=" messagesBox mx-auto h-100">
                    {this.props.messages}
                
                </div>
            </div>


        );
    }

    componentDidUpdate() {
        this.settingChat();
    }

    

    settingChat() {

        $(function () {
            $(".messagesBox").scrollTop(102391203810938120938100);
        });

    }
}


export default ChatHandler;