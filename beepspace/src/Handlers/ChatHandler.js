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



    render() {

        var userRmvButton = "";
        if(this.props.chatUser){
            userRmvButton= <div class="col-md-2 col-4"><button class="btn topBoxButton buttonCustom"><i class="fas fa-users-slash"></i></button></div>;

        }
        return (

            <div class="h-75">
                <div class="nameBox row mx-auto ">
                    <div class="col-md-10 col-8 text-left"><h3 class="buttonCustom jmeno">{this.props.chatUser}</h3></div>
                    {userRmvButton}
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

    fillChat(user, reciever) {
        this.chat = this.messageController.returnAllMesages(this.requestHandler.jSONrequester("Message", [
            new ParameterHandler("user", user),
            new ParameterHandler("reciever", reciever)]))
        this.settingChat();
    }

    settingChat() {

        $(function () {
            $(".messagesBox").scrollTop(102391203810938120938100);
        });

    }
}


export default ChatHandler;