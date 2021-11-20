import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalUser from "../modalUser";
import RequestHandler from "../../../Handlers/RequestHandler";
import ParameterHandler from "../../../Handlers/ParameterHandler";

export default function FriendModal(params) {
    const requestHandler = new RequestHandler();

    const [users, setUsers] = useState();

    const input = React.createRef();
    const search = () => {

        if(input.current.value != ""){
            let user = requestHandler.jSONrequester("User", [
                new ParameterHandler("type","ONE"),
                new ParameterHandler("username", input.current.value)
            ])
            console.log(user)
            if (user != null) {
                setUsers(<ModalUser name={user.name} userId={user.id}/>);
    
            }else {
            setUsers(null);
            }
            input.current.value = "";   
        }
    }

    const searchOnEnter = (e) => {

        if (e.keyCode === 13) {
            search(e)
        }
    }




    return (

        <Modal contentClassName="modalClasses" show={params.state}>

            <Modal.Header>
                <div class="row w-100">
                    <div class="col-8"><h2>přidat přátele</h2></div>
                    <div class="col-2"></div>
                    <div class="col-1 text-right "><button class="btn modalCloseButton" onClick={params.closeModal}><i class="far fa-times-circle"></i></button></div>

                </div>
            </Modal.Header>
            <Modal.Body>
                <div class="row searchUser w-100 mb-5">
                    <div class="col-8">
                        <input type="search" class="form-control" ref={input} onKeyDown={searchOnEnter} placeholder="Hledat uživatele" aria-label="Search" />
                    </div>
                    <div class="col-4">
                        <button type="submit" class="form-control " onClick={search} value="" aria-label="Search" ><i class="fas fa-search"></i></button>
                    </div>
                </div>
                <div class="separator"></div>
                {users}

            </Modal.Body>
        </Modal>

    );
}




