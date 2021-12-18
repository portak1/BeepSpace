import React from "react"
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ModalUser from "./modalUser";
import ParameterHandler from "../../Handlers/ParameterHandler";
import UserController from "../../Controllers/UserController";
import RequestHandler from "../../Handlers/RequestHandler";

export default function ModalInviteGroupchat(params){
    const requestHandler = new RequestHandler();
    const userController = new UserController();

    const [users, setUsers] = useState();

    const input = React.createRef();



    const search = () => {
        if(input.current.value != "" && input.current.value != userController.getUser().username){
            let user = requestHandler.jSONrequester("User", [
                new ParameterHandler("type","ONE"),
                new ParameterHandler("username", input.current.value)
            ])
            if (user != null) {
                var chatState = requestHandler.jSONrequester("Groupchat",[
                    new ParameterHandler("type", "IN-CHAT"),
                    new ParameterHandler("id", props.groupchatID),
                    new ParameterHandler("user",user.name)
                ])
                setUsers(<ModalUser name={user.name} chatState={chatState} userId={user.id}/>);
                
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

    const liveSearch = () =>{
        if(input.current.value != ""&& input.current.value != userController.getUser().username){
            let user = requestHandler.jSONrequester("User", [
                new ParameterHandler("type","ONE"),
                new ParameterHandler("username", input.current.value)
            ])
            if (user != null) {
                var friendsState = requestHandler.jSONrequester("User",[
                    new ParameterHandler("type", "IS-FRIENDS"),
                    new ParameterHandler("id", userController.getUser().id),
                    new ParameterHandler("id2",user.id)
                ])
                console.log(friendsState)
                setUsers(<ModalUser name={user.name} friendsState={friendsState.state} userId={user.id}/>);
                
            }else {
            setUsers(null);
            }
        }
    }

return(
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
        <div class="col-8">
            <input type="search" class="form-control" ref={input} onChange={liveSearch} onKeyDown={searchOnEnter}  placeholder="Hledat uživatele" aria-label="Search" />
        </div>
        <div class="col-4">
            <button type="submit" class="form-control " onClick={search} value="" aria-label="Search" ><i class="fas fa-search"></i></button>
        </div>
    </div>
    <div class="separator"></div>
    {users}

</Modal.Body>
</Modal>)

;
    
}