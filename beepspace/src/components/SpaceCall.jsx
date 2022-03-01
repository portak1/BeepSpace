import { useState } from "react";
import UserController from "../Controllers/UserController";
import useSound from 'use-sound';
import joinSound from "../storage/sounds/JoinChannel.mp3";

const userController = new UserController();

export default function SpaceCall(props){
    const [connectedState,setConnectedState] = useState(false);
    const [playJoin] = useSound(
      joinSound
    );
  
    
    const joinSpace = () =>{
      if(!connectedState){
        props.socket.emit("joinSpace",{
          user: userController.getUser().username,
          connectTo: props.user
        });
        playJoin();
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