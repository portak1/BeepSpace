import React, { Component } from "react";
import { render } from "react-dom";
import $ from 'jquery'
import UserController from "../Controllers/UserController";
import RequestHandler from "./RequestHandler";
import MessageController from "../Controllers/MessageController";
import ParameterHandler from "./ParameterHandler";

class ChatHandler extends Component {
    userController = new UserController();
    requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
    messageController = new MessageController();
    chat = [];
    constructor() {
        super();

    }



    render() {
        if (this.props.chatUser) {
            this.fillChat(this.userController.getUser().username, this.props.chatUser.reciever);
            return (
                <div id="messageBox" class=" messagesBox mx-auto h-75">
                    {this.chat}
                    {console.log(this.props.chatUser.reciever)}
                    { }
                </div>
            );
        }
            return (
                <div id="messageBox" class=" messagesBox mx-auto h-75"> 
                </div>
            );

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