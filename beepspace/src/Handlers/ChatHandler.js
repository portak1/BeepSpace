import React, { Component } from "react";
import $ from 'jquery'
import UserController from "../Controllers/UserController";
import RequestHandler from "./RequestHandler";
import MessageController from "../Controllers/MessageController";
import ParameterHandler from "./ParameterHandler";

class ChatHandler extends Component {
   
    chat = [];

    constructor() {
        super();
        this.userController = new UserController();
        this.requestHandler = new RequestHandler();
        this.messageController = new MessageController();
    }
    
    openInviteModal =() => this.props.openInviteModal();
    removeFriend = () => {
        const activeUser = this.requestHandler.jSONrequester("User",[
            new ParameterHandler("type", "ONE"),
            new ParameterHandler("username", this.props.chatUser)
        ]);
        this.requestHandler.jSONrequester("User",[
            new ParameterHandler("type", "REMOVE-FRIEND"),
            new ParameterHandler("id", this.userController.getUser().id),
            new ParameterHandler("id2", activeUser.id)
        ]);
        this.props.socket.emit("unfriend",{
            user: this.userController.getUser().username,
            reciever:  this.props.chatUser
        });
        window.location.reload(false);
        }

    render() {
        var userRmvButton = "";
        var userLeaveGroup = "";
        var userInviteButton = "";
        if(this.props.chatUser){
            if(!this.props.isChatGroupchat){
                userRmvButton= <div class="col-md-2 col-4"><button onClick={this.removeFriend} class="btn topBoxButton buttonCustom"><i class="fas fa-users-slash"></i></button></div>;
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