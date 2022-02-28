import { useEffect, useState, useRef } from 'react';
import UserController from '../../Controllers/UserController';
import { Peer } from 'simple-peer';

var user;
var reciever;
var chatHandler;
var classess;
function SidebarUser(props) {
  const userController = new UserController();
  const [onCall, setOnCall] = useState(false);
  const [muted, setMuted] = useState(false);

  var onCallRef = useRef(onCall);
  var mutedRef = useRef(muted);

  onCallRef.current = onCall;
  mutedRef.current = muted;

  useEffect(() => {
    props.socket.on('pickCall', (data) => {
      if (data.name == props.reciever) {
        setOnCall(true);
      }
    });
    props.socket.on('leaveCall', (data) => {
      if (data.name == props.reciever) {
        setOnCall(false);
      }
    });

    props.socket.on('mute', (data) => {
      if (data.name == props.reciever) {
        setMuted(true);
      }
    });
    props.socket.on('unmute', (data) => {
      if (data.name == props.reciever) {
        setMuted(false);
      }
    });
  }, []);

  if (props.online == 1) {
    classess = 'ball online';
  } else if (props.online == 0) {
    classess = 'ball offline';
  } else {
    classess = 'ball paused';
  }
  const [online, setOnline] = useState(
    props.online ? 'ball online' : 'ball offline'
  );
  reciever = props.reciever;
  chatHandler = props.chatHandler;
  const handleChange = () =>
    userController.getUser().username == props.reciever
      ? null
      : props.handleInputUser(props.reciever);

  props.socket.on('clientOnline', function (data) {
    if (data.user == props.reciever) {
      setOnline('ball online');
    }
  });

  props.socket.on('clientOffline', function (data) {
    if (data.user == props.reciever) {
      setOnline('ball offline');
    }
  });

  props.socket.on('clientPause', function (data) {
    if (data.user == props.reciever) {
      setOnline('ball paused');
    }
  });

  var icon = () => {
    if (onCallRef.current && mutedRef.current) {
      return (
        <div>
          <i class='fas fa-satellite-dish'></i>
          <i class='fas fa-microphone-slash' aria-hidden='true'></i>
        </div>
      );
    }
    if (onCallRef.current) {
      return <i class='fas fa-satellite-dish'></i>;
    }

    if (mutedRef.current) {
      return <i class='fas fa-microphone-slash' aria-hidden='true'></i>;
    }

    return;
  };

  return (
    <li>
      <a className='userButton' onClick={handleChange}>
        <div className='row'>
          <div className='col-2'>
            <span class={online}></span>
          </div>
          <div className='col-6'>{reciever}</div>
          <div className='col-4'>{icon()}</div>
        </div>
      </a>
    </li>
  );
}

export default SidebarUser;
