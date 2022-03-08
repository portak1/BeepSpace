import RequestHandler from '../../Handlers/RequestHandler';
import ParameterHandler from '../../Handlers/ParameterHandler';
import UserController from '../../Controllers/UserController';
import { useState, useEffect } from 'react';

export default function Notification(props) {
  var notification;
  const requestHandler = new RequestHandler();
  const userController = new UserController();
  const [groupchat, setGroupchat] = useState({});

  useEffect(() => {
    if (props.groupchatID) {
      requestHandler
        .jSONrequester('Groupchat', [
          new ParameterHandler('type', 'GET-GROUPCHAT'),
          new ParameterHandler('id', props.groupchatID),
        ])
        .then((data) => {
          setGroupchat(data);
        });
    }
  }, [props]);

  const addFriend = () => {
    requestHandler.jSONrequester('Notifications', [
      new ParameterHandler('type', 'CONFIRM'),
      new ParameterHandler('user', props.user),
      new ParameterHandler('reciever', userController.getUser().username),
      new ParameterHandler('id', props.notId),
    ]);
    props.socket.emit('addUser', {
      localUser: userController.getUser().username,
      username: props.user,
    });
    props.removeNotification(props.notId);
  };

  const decline = () => {
    requestHandler.jSONrequester('Notifications', [
      new ParameterHandler('type', 'REMOVEONE'),
      new ParameterHandler('id', props.notId),
    ]);
    props.removeNotification(props.notId);
  };

  const acceptInvite = () => {
    requestHandler
      .jSONrequester('Groupchat', [
        new ParameterHandler('type', 'ACCEPT-INVITE'),
        new ParameterHandler('id', props.groupchatID),
        new ParameterHandler('user', userController.getUser().username),
      ])
      .then(() => {
        requestHandler
          .jSONrequester('Notifications', [
            new ParameterHandler('type', 'REMOVEONE'),
            new ParameterHandler('id', props.notId),
          ])
          .then(() => {
            props.socket.emit('addChannel', {
              localUser: userController.getUser().username,
              channel: props.groupchatID,
            });
            props.removeNotification(props.notId);
          });
      });
  };

  if (props.type == 'add') {
    return (
      <div class='row w-100 userLine'>
        <div class='col-2'>
          <i class='fas fa-user-plus'></i>
        </div>
        <div class='col-4'>{props.user}</div>
        <div class=' tlacitko col-3'>
          <button
            onClick={addFriend}
            class='btn w-100 btnPridat btnPrijmout btn-success'
          >
            <i class='fas fa-check'></i>
          </button>
        </div>
        <div class='tlacitko col-3'>
          <button
            onClick={decline}
            class='btn w-100 btnOdebrat btnOdmitnout btn-gray'
          >
            <i class='fas fa-times'></i>
          </button>
        </div>
      </div>
    );
  } else if (props.type == 'message') {
    return (
      <div class='row w-100 userLine'>
        <div class='col-2'>
          <i class='fas fa-envelope'></i>
        </div>
        <div class='col-4'>{props.user}</div>
        <div class='col-6 notificationText'>{props.content}</div>
      </div>
    );
  } else if (props.type == 'invite') {
    return (
      <div class='row w-100 userLine'>
        <div class='col-2'>
          <i class='fas fa-user-friends'></i>
        </div>
        <div class='col-4'>{groupchat?.name}</div>
        <div class=' tlacitko col-3'>
          <button
            onClick={acceptInvite}
            class='btn w-100 btnPridat btnPrijmout btn-success'
          >
            <i class='fas fa-check'></i>
          </button>
        </div>
        <div class='tlacitko col-3'>
          <button
            onClick={decline}
            class='btn w-100 btnOdebrat btnOdmitnout btn-gray'
          >
            <i class='fas fa-times'></i>
          </button>
        </div>
      </div>
    );
  }
}
