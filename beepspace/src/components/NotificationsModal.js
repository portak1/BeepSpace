import React from "react";
import Modal from "react-bootstrap/Modal";
import RequestHandler from "../Handlers/RequestHandler";
import UserController from "../Controllers/UserController";
import ParameterHandler from "../Handlers/ParameterHandler";
import Notification from "./smallComponents/Notifiaction";
import { useState } from "react";


export default function NotificationsModal(params) {
    const requestHandler = new RequestHandler();
    const userController = new UserController();
    const [notifications,setNotifications] = useState();
    var userArray = [];
    userArray = requestHandler.jSONrequester("Notification",[
        new ParameterHandler("type","GET"),
        new ParameterHandler("user", userController.getUser().username)
    ])

    console.log(userArray);
  
   



    return (

        <Modal contentClassName="modalClasses" show={params.state}>

            <Modal.Header>
                <div class="row w-100">
                    <div class="col-8"><h2>notifikace</h2></div>
                    <div class="col-2"></div>
                    <div class="col-1 text-right "><button class="btn modalCloseButton" onClick={params.closeModal}><i class="far fa-times-circle"></i></button></div>

                </div>
            </Modal.Header>
            <Modal.Body>

               <Notification addNotification={true} user="janicka" />
               <Notification user="janicka" content="ahoj ja jsem janicka a jsem frayerka" />

            </Modal.Body>
        </Modal>

    );
}




