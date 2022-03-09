import React from 'react';
import Message from '../components/smallComponents/chatComponents/message';
import ParameterHandler from '../Handlers/ParameterHandler';
import RequestHandler from '../Handlers/RequestHandler';
import UserController from './UserController';
class MessageController extends React.Component {
  socket;

  constructor(socket) {
    super();
    this.socket = socket;
    this.requestHandler = new RequestHandler();
    this.userController = new UserController();
  }

  async returnAllMesages(messages) {
    return new Promise((resolve, reject) => {
      var arrOfMesages = [];
      for (let i = 0; i < messages.length; i++) {
        if (i != messages.length - 1) {
          if (messages[i + 1].mine != messages[i].mine) {
            arrOfMesages.push(
              <Message
                content={messages[i].content}
                owner={messages[i].mine}
                last={true}
              />
            );
          } else {
            arrOfMesages.push(
              <Message
                content={messages[i].content}
                owner={messages[i].mine}
                last={false}
              />
            );
          }
        } else {
          arrOfMesages.push(
            <Message
              content={messages[i].content}
              owner={messages[i].mine}
              last={true}
            />
          );
        }
      }
      resolve(arrOfMesages);
    });
  }

  pushNewMessage(content, mine, array) {
    var arrOfMesages = array;

    if (arrOfMesages == null) {
      arrOfMesages = [];
    }

    arrOfMesages.push(<Message content={content} owner={mine} last={true} />);
    return arrOfMesages;
  }

  sendMessage(content, reciever) {
    this.requestHandler.jSONrequester('Message', [
      new ParameterHandler('create', 1),
      new ParameterHandler('user', this.userController.getUser().username),
      new ParameterHandler('reciever', reciever),
      new ParameterHandler('content', content),
      new ParameterHandler('date', new Date()),
    ]);

    this.requestHandler
      .jSONrequester('Notifications', [
        new ParameterHandler('type', 'CREATE'),
        new ParameterHandler('user', this.userController.getUser().username),
        new ParameterHandler('reciever', reciever),
        new ParameterHandler('date', new Date()),
        new ParameterHandler('content', content),
        new ParameterHandler('addNotification', 0),
        new ParameterHandler('groupchatID', 0),
      ])
      .then(() => {
        this.socket.emit('notification', {
          reciever: reciever,
          origin: this.userController.getUser().username,
          type: 'message',
          content: content,
          date: new Date(),
          groupchatID: null,
        });
      });
  }

  sendGroupchatMessage(content, chatId) {
    console.log(
      this.requestHandler.jSONrequester('Message', [
        new ParameterHandler('create', 1),
        new ParameterHandler('user', this.userController.getUser().username),
        new ParameterHandler('reciever', 0),
        new ParameterHandler('content', content),
        new ParameterHandler('date', new Date()),
        new ParameterHandler('isChatMessage', 1),
        new ParameterHandler('chatId', chatId),
      ])
    );
  }
}

export default MessageController;
