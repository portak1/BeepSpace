import './App.css';
import $ from 'jquery';
import Sidebar from './components/sidebar';
import ChatHandler from './Handlers/ChatHandler';
import React, { useState } from 'react';
import UserController from './Controllers/UserController';
import ParameterHandler from './Handlers/ParameterHandler';
import RequestHandler from './Handlers/RequestHandler';
import MessageController from './Controllers/MessageController';
import TextInput from './components/smallComponents/chatComponents/TextInput';
import { io } from "socket.io-client";

export default class App2 extends React.Component {


    constructor() {
        super();
        this.socket = io("http://localhost:3001/");
        this.socket.on("connect", () => {
        });
        this.requestHandler = new RequestHandler();
        this.userController = new UserController();
        this.messageController = new MessageController();
        this.userHolder = "";
        this.state = {
            messages: [],
            chatUser: ""
        }
        checkIfReady();

    }


    render() {
        return (

            <div class="mainContainer">
                {checkIfReady()}
                <div id="main" class="text-center">
                    <a class="sidebar-toggle-btn trigger-toggle-sidebar"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line line-angle1"></span><span class="line line-angle2"></span></a>
                    <ChatHandler messages={messages} chatUser={chatUser} />


                    <TextInput chatUser={chatUser} sendMessageFunction={sendMessage} />


                </div>
                <Sidebar handleInputUser={handleInputUser}></Sidebar>
                <this.useQuery />
            </div>

        );
    }

    checkIfReady() {
        if (!userController.isLoggedIn() && window.location.pathname != "/login" && window.location.pathname != "/register") {
            window.location.replace("/login");
        }
    }


    getMessages(user, reciever) {
        return messageController.returnAllMesages(requestHandler.jSONrequester("Message", [
            new ParameterHandler("user", user),
            new ParameterHandler("reciever", reciever)]))
    }






    // function to handle sidebar user click
    handleInputUser = (inputValue) => {
        this.socket.emit("joinChannel", { channel: inputValue });
        this.setChatUser(inputValue);
    }


    //function for sending data to database and to socket
    sendMessage = (content) => {
        this.messageController.sendMessage(content, chatUser);
        this.socket.emit("message", {
            origin: userController.getUser().username,
            reciever: chatUser,
            content: content
        })
        let newMessageArray = messageController.pushNewMessage(content, true, messages);
        this.setState({ messages: [newMessageArray] });

    }



    refreshPrevent() {
        //prevent from user refreshing after click
        if (userHolder != chatUser && chatUser) {
            userHolder = chatUser;
            setMessages(getMessages(userController.getUser().username, chatUser))
        }
    }

//socket rerender data
    this.socket.on("message", function (data) {

        if (data.origin == chatUser && data.reciever == userController.getUser().username) {
            let newMessageArray = messageController.pushNewMessage(data.message, false, messages);
            setMessages([newMessageArray]);
        }
    })


useQuery(){
    $(document).ready(function ($) {

        var cols = {},

            messageIsOpen = false;

        cols.showSidebar = function () {
            $('body').addClass('show-sidebar');
        };
        cols.hideSidebar = function () {
            $('body').removeClass('show-sidebar');
        };


        $('.trigger-toggle-sidebar').on('click', function () {
            if (!$('body').hasClass('show-sidebar')) {
                cols.showSidebar();
            } else {
                cols.hideSidebar();
            }
        });

        $('.crossIcon').on('click', function () {


            cols.hideSidebar();

        });

        if ($('body').hasClass('show-sidebar')) {

            $('#main').on('click', function () {

                cols.hideSidebar();

            });
        }

    });

}
  
}