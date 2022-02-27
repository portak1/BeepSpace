import { useState } from "react";
import UserController from "../Controllers/UserController";

const userController = new UserController();

export default function SpaceCall(props){
    const [connectedState,setConnectedState] = useState(false);

  
    const joinSpace = () =>{
      console.log(connectedState);
      if(!connectedState){
        props.socket.emit("joinSpace",{
          user: userController.getUser().username,
          connectTo: props.user
        });
        setConnectedState(true);
        return;
      }
      props.socket.emit("leaveSpace",{
        user: userController.getUser().username,
        connectTo: props.user
      });
      setConnectedState(false);

     
    }



    return(
      <div class='row'>
        <div class='col-12'>
          <button onClick={joinSpace} class='btn topBoxButton w-100'>
            <i class="fas fa-satellite-dish"></i>
            <h3>{props.user}</h3>
          </button>
        </div>
      </div>

    );
}