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
    constructor() {
        super();
        this.state = {
            chat: []
        }

    }


    render() {
        return (
            <div id="messageBox" class=" messagesBox mx-auto h-75">
                {this.state.chat}
                {this.settingChat()}
            </div>
        );
    }


    componentDidMount() {
        this.fillChat("admin","petrPepega");
    }

    fillChat(user, reciever) {
        this.setState({
             chat: this.messageController.returnAllMesages(this.requestHandler.jSONrequester("Message", [new ParameterHandler("user", user), new ParameterHandler("reciever", reciever)]))
             });
        this.settingChat();
        console.log(this.messageController.returnAllMesages(this.requestHandler.jSONrequester("Message", [new ParameterHandler("user", user), new ParameterHandler("reciever", reciever)])))


    }

    settingChat() {

        $(function () {
            $(".messagesBox").scrollTop(102391203810938120938100);
        });

    }
}


export default ChatHandler;