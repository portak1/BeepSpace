import React from "react";
import Message from "../components/smallComponents/chatComponents/message";
import ParameterHandler from "../Handlers/ParameterHandler";
import RequestHandler from "../Handlers/RequestHandler";
import UserController from "./UserController";
class MessageController extends React.Component {


  constructor() {
    super();
    this.requestHandler = new RequestHandler();
    this.userController = new UserController();
  }



  returnAllMesages(jsonData) {
    var arrOfMesages = [];

    for (let i = 0; i < jsonData.length; i++) {
      if (i != jsonData.length - 1) {
        if (jsonData[i + 1].mine != jsonData[i].mine) {
          arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine} last={true} />)
        } else {
          arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine} last={false} />)
        }
      } else {
        arrOfMesages.push(<Message content={jsonData[i].content} owner={jsonData[i].mine} last={true} />)
      }
    }
    return arrOfMesages;
  }



  pushNewMessage(content, mine, array) {
    var arrOfMesages = array;


    if (arrOfMesages == null) {
      arrOfMesages = [];
    }

    arrOfMesages.push(<Message content={content} owner={mine} last={true} />)
    return arrOfMesages;
  }


  sendMessage(content, reciever) {
    this.requestHandler.jSONrequester("Message", [
      new ParameterHandler("create", 1),
      new ParameterHandler("user", this.userController.getUser().username),
      new ParameterHandler("reciever", reciever),
      new ParameterHandler("content", content),
      new ParameterHandler("date", new Date())]
    )
  }

  sendGroupchatMessage(content, chatId) {

    console.log(this.requestHandler.jSONrequester("Message", [
      new ParameterHandler("create", 1),
      new ParameterHandler("user", this.userController.getUser().username),
      new ParameterHandler("reciever", 0),
      new ParameterHandler("content", content),
      new ParameterHandler("date", new Date()),
      new ParameterHandler("isChatMessage",1),
      new ParameterHandler("chatId", chatId)
    ]
    ))
  }



}


export default MessageController;
