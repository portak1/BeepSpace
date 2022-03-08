import UserController from '../../Controllers/UserController';
import RequestHandler from '../../Handlers/RequestHandler';
import ParameterHandler from '../../Handlers/ParameterHandler';
import { useEffect } from 'react';
import SidebarUser from './sidebarUser';
import { useState, useRef } from 'react';

const userController = new UserController();

export default function SidebarGroupchat(props) {
  useEffect(() => {
    props.socket.on('joinedChannel', (data) => {
      joinChannel(data);
    });
    props.socket.on('disconnectedChanel', function (data) {
      setActiveUsers(
        activeUsersRef.current.filter((item) => {
          return item.props.reciever != data.user;
        })
      );
    });
    let cancel = false;
    requestHandler
      .jSONrequester('Groupchat', [
        new ParameterHandler('type', 'ACTIVE-USERS'),
        new ParameterHandler('id', props.groupchatID),
      ])
      .then((data) => {
        if (cancel) return;
        setActiveUsers(generateArray(data));
      });
    return () => {
      cancel = true;
    };
  }, []);

  var rendered = false;
  const requestHandler = new RequestHandler();

  const [activeUsers, setActiveUsers] = useState([]);
  const activeUsersRef = useRef(activeUsers);
  activeUsersRef.current = activeUsers;

  const generateArray = (arr) => {
    return arr.map((data, id) => {
      return (
        <SidebarUser
          handleInputUser={props.handleInputUser}
          key={id}
          user={userController.getUser().username}
          online={true}
          socket={props.socket}
          activeUser={props.activeUser}
          reciever={data.name}
        />
      );
    });
  };

  const joinChannel = (data) => {
    if (data.channelID == props.name) {
      if (activeUsersRef.current.length) {
        if (
          !activeUsersRef.current.some((item) => {
            return item.props.reciever == data.user;
          })
        ) {
          setActiveUsers((activeUsers) => [
            ...activeUsers,
            <SidebarUser
              handleInputUser={props.handleInputUser}
              user={userController.getUser().username}
              online={true}
              socket={props.socket}
              activeUser={props.activeUser}
              reciever={data.user}
            />,
          ]);
        }
      } else {
        setActiveUsers((activeUsers) => [
          ...activeUsers,
          <SidebarUser
            handleInputUser={props.handleInputUser}
            user={userController.getUser().username}
            online={true}
            socket={props.socket}
            reciever={data.user}
            activeUser={props.activeUser}
          />,
        ]);
      }
    }
  };

  const handleChange = () => {
    props.handleInputGroupchat(props.groupchatID, props.name);
  };

  return (
    <div class='wholeSidebarGroupchat'>
      <li>
        <a href='#' style={{ color: props.color }} onClick={handleChange}>
          <h4>{props.name}</h4>
        </a>
      </li>
      <div class='ml-3'>{activeUsers}</div>
    </div>
  );
}
