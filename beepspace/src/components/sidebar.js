import { ReactComponent as Logo } from '.././storage/images/astroLogo.svg';
import SidebarUser from './smallComponents/sidebarUser';
import UserController from '../Controllers/UserController';
import RequestHandler from '../Handlers/RequestHandler';
import ParameterHandler from '../Handlers/ParameterHandler';
import React from 'react';
const userController = new UserController();
const requestHandler = new RequestHandler("http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/");
var userArray = [];

function Sidebar(props) {
    var elementArray = [];
    userArray = requestHandler.jSONrequester("User", [
        new ParameterHandler("type", "ALL")
    ]);


    //logo

    // <a class="navbar-brand-login text-center" href="">
    //<div class="mx-auto beepLogo"><Logo></Logo></div></a>

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
                                <button class="btn topBoxButton"><i class="fas fa-search"></i></button>
                            </div>
                            <div class="col">
                                <button class="btn topBoxButton"><i class="fab fa-connectdevelop"></i></button>
                            </div>
                            <div class="col">
                                <button onClick={userController.logOut} class="btn topBoxButton"><i class="fas fa-sign-out-alt"></i></button>
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
                    <ul class="labels">
                        <li class="title">Role <span class="icon">+</span></li>
                        <li><a href="#">role2 <span class="ball pink"></span></a></li>
                        <li><a href="#">role3 <span class="ball green"></span></a></li>
                        <li><a href="#">role4 <span class="ball blue"></span></a></li>
                    </ul>
                </div>
                <div class="separator"></div>
                <div class="menu-segment">
                    <ul class="chat">
                        <li class="title">Chat <span class="icon">+</span></li>
                        {userArray.map((data, id) => {
                            if(data.name != userController.getUser().username)
                                return <SidebarUser handleInputUser={props.handleInputUser} user={userController.getUser().username} reciever={data.name} />
                        })}


                        <li><a href="#"><span class="ball pink"></span>Jan Mráz</a></li>
                        <li><a href="#"><span class="ball blue"></span>Daniel Seiner</a></li>
                        <li><a href="#" class="italic-link">zobrazit offline list</a></li>
                    </ul>
                </div>
                <div class="bottom-padding"></div>
            </div>
        </aside>
    );

}


export default Sidebar;


