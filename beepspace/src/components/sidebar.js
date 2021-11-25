import SidebarUser from './smallComponents/sidebarUser';
import { useState } from 'react';
import UserController from '../Controllers/UserController';
import RequestHandler from '../Handlers/RequestHandler';
import ParameterHandler from '../Handlers/ParameterHandler';
import $ from 'jquery';
import React from 'react';
const userController = new UserController();
const requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
var userArray = [];
var rendered = false;
var usersFriendsArray = [];
function Sidebar(props) {

 


    userArray = requestHandler.jSONrequester("User", [
        new ParameterHandler("type", "ALL")
    ]);

    if(!rendered){
        rendered = true;
        usersFriendsArray =  userArray.map((data, id) => {
            var friendsState = requestHandler.jSONrequester("User",[
                new ParameterHandler("type", "IS-FRIENDS"),
                new ParameterHandler("id", userController.getUser().id),
                new ParameterHandler("id2",data.id)
            ])
            if (data.name != userController.getUser().username){
                if(friendsState.state){
                    return <SidebarUser handleInputUser={props.handleInputUser} key={id} user={userController.getUser().username} online={data.online} socket={props.socket} reciever={data.name} />
                }
            }
        })
    }

    const logOut = () =>{
        userController.logOut(props.socket);
    }
    return (
        <aside id="sidebar" class="nano">
            <div class="nano-content">
                <div class="row text-center mx-auto">
                    <div class="col crossIconCol"><i class="fas fa-times crossIcon"></i></div>
                </div>
                <div class="row text-center mx-auto">

                    <div class="col mt-3 userBox pb-3 text-center">
                        <h1>{userController.getUser().username}</h1>

                        <div class="row">
                            <div class="col">
                                <button class="btn topBoxButton" onClick={props.setModalShow}><i class="fas fa-search"></i></button>
                            </div>
                            <div class="col">
                                <button class="btn topBoxButton" onClick={showCallButtons}><i class="fab fa-connectdevelop"></i></button>
                            </div>
                            <div class="col">
                                <button onClick={logOut} class="btn topBoxButton"><i class="fas fa-sign-out-alt"></i></button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                            <button class="btn topBoxButton w-100" onClick={props.setNModalShow}><i class="fas fa-mail-bulk"></i>   </button>

                            </div>
                        </div>


                        <div id="callButtons" class="row d-none">
                            <div class="col">
                                <button class="btn topBoxButton"><i class="fas fa-search"></i></button>
                            </div>
                            <div class="col">
                                <button class="btn topBoxButton"><i class="fab fa-connectdevelop"></i></button>
                            </div>
                            <div class="col">
                                <button onClick={logOut} class="btn topBoxButton"><i class="fas fa-sign-out-alt"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
                <menu class="menu-segment">
                    <ul>
                        <li class="active"><a href="#">Test<span></span></a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                    </ul>
                </menu>

                <div class="separator"></div>
                <div class="menu-segment">
                    <ul class="chat">
                        <li class="title">Chat <span class="icon">+</span></li>
                        {usersFriendsArray}


                    </ul>
                </div>
                <div class="bottom-padding"></div>
            </div>         
        </aside>


    );

}


function showSearchBar() {
    if ($("#searchButtons").hasClass("d-none")) {
        $("#searchButtons").removeClass("d-none");
        return;
    }

    $("#searchButtons").addClass("d-none");
}

function showCallButtons() {
    if ($("#callButtons").hasClass("d-none")) {
        $("#callButtons").removeClass("d-none");
        return;
    }

    $("#callButtons").addClass("d-none");
}



export default Sidebar;


