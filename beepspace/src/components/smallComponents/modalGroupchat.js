import React from "react"
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ParameterHandler from "../../Handlers/ParameterHandler";
import UserController from "../../Controllers/UserController";
import RequestHandler from "../../Handlers/RequestHandler";

export default function ModalGroupchat(params) {
    const requestHandler = new RequestHandler();
    const userController = new UserController();

    const [users, setUsers] = useState();

    const name = React.createRef();
    const color = React.createRef();



    const create = () => {
        if(name.current.value == "" || color.current.value == ""){
            return;
        }
        var currentColor =  color.current.value.replace("#","");
        if(requestHandler.jSONrequester("Groupchat",[
            new ParameterHandler("type","CREATE"),
            new ParameterHandler("name", name.current.value),
            new ParameterHandler("color", currentColor),
            new ParameterHandler("id",userController.getUser().id)
        ]).state){
            name.current.value = "";
            color.current.value = "";
        }

       

    }



    return (
        <Modal contentClassName="modalClasses" show={params.state}>
            <Modal.Header>
                <div class="row w-100">
                    <div class="col-8"><h2>Pozvat přátele do prostoru</h2></div>
                    <div class="col-2"></div>
                    <div class="col-1 text-right "><button class="btn modalCloseButton" onClick={params.closeModal}><i class="far fa-times-circle"></i></button></div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div class="row searchUser w-100 mb-5">
                    <div class="col-12 mt-5">
                        <input type="text" class="form-control" ref={name} placeholder="jméno" aria-label="jméno" required/>
                    </div>
                    <div class="col-12 mt-3">
                        <input type="color" class="form-control" ref={color} placeholder="barva" aria-label="barva" required />
                    </div>
                    <div class="col-3 mt-5 mx-auto">
                        <button type="submit" class="form-control " onClick={create} value="" aria-label="Vytvořit" ><i class="far fa-plus-square"></i></button>
                    </div>
                </div>
                <div class="separator"></div>
                {users}

            </Modal.Body>
        </Modal>)

        ;

}