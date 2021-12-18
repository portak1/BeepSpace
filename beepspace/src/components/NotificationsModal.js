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
    var notificationsArray = [];

    notificationsArray = requestHandler.jSONrequester("Notifications",[
        new ParameterHandler("type","GET"),
        new ParameterHandler("user", userController.getUser().username)
    ])

    const removeNotification = (key) =>{
        setNotifications(notifications.filter(item => item.notId == key));
     }

    const [notifications,setNotifications] = useState((notificationsArray==false)? [] : notificationsArray.map((data,id)=>{
        if(data.type =="message"){
            return <Notification  socket={params.socket} removeNotification={removeNotification} key={id} notId={data.id} user={data.user} content={data.content}  />;
        }else{
           return <Notification socket={params.socket} removeNotification={removeNotification} key={id} notId={data.id}  addNotification={true} user={data.user} />
        }
    }));

    

    

//<Notification addNotification={true} user="janicka" />
  //             <Notification user="janicka" content="ahoj ja jsem janicka a jsem frayerka" />

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

               
                {notifications}
            </Modal.Body>
        </Modal>

    );
}




