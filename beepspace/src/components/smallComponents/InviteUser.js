import RequestHandler from '../../Handlers/RequestHandler';
import ParameterHandler from '../../Handlers/ParameterHandler';
import UserController from '../../Controllers/UserController';

export default function InviteUser(params) {
  const requestHandler = new RequestHandler();
  const userController = new UserController();
  var button = null;

  const inviteFriend = () => {
    requestHandler
      .jSONrequester('Notifications', [
        new ParameterHandler('type', 'INVITE'),
        new ParameterHandler('user', userController.getUser().username),
        new ParameterHandler('reciever', params.name),
        new ParameterHandler('date', new Date()),
        new ParameterHandler(
          'content',
          'new invite request from ' + userController.getUser().username
        ),
        new ParameterHandler('addNotification', 1),
        new ParameterHandler('groupchatID', params.groupchatID),
      ])
      .then((data) => {
        console.log(data.state);
        if (data.state == 'sent') {
          params.socket.emit('notification', {
            reciever: params.name,
            origin: userController.getUser().id,
            type: 'invite',
            content:
              'nová žádost o přátelství od ' +
              userController.getUser().username,
            date: new Date(),
            groupchatID: params.groupchatID,
          });
        }
      });
  };
  if (!params.groupState) {
    button = (
      <div class=' tlacitko col-4'>
        <button onClick={inviteFriend} class='btn btnPridat btn-success'>
          Pozvat
        </button>
      </div>
    );
  } else {
    button = (
      <div class='tlacitko col-4'>
        <button class='btn btnOdebrat btn-gray'>Již v chatu</button>
      </div>
    );
  }

  return (
    <div class='row w-100 userLine'>
      <div class='col-8'>{params.name}</div>
      {button}
    </div>
  );
}
