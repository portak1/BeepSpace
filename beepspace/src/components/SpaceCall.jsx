import { useState } from 'react';
import UserController from '../Controllers/UserController';
import useSound from 'use-sound';
import joinSound from '../storage/sounds/joinChannel.mp3';
import leaveSound from '../storage/sounds/leavechannel.mp3';

const userController = new UserController();

export default function SpaceCall(props) {
  const [connectedState, setConnectedState] = useState(false);
  const [playJoin] = useSound(joinSound);
  const [playLeave] = useSound(leaveSound);

  const joinSpace = () => {
    if (!connectedState) {
      props.socket.emit('joinSpace', {
        user: userController.getUser().username,
        connectTo: props.user,
      });
      playJoin();
      setConnectedState(true);
      return;
    }
    props.socket.emit('leaveSpace', {
      user: userController.getUser().username,
      connectTo: props.user,
    });
    playLeave();
    setConnectedState(false);
  };

  if (props.user) {
    return (
      <div class='row'>
        <div class='col-12'>
          <button onClick={joinSpace} class='btn topBoxButton w-100'>
            <i class='fas fa-satellite-dish'></i>
            <h3>{props.user}</h3>
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
