import React from "react";
import Message from "../components/smallComponents/chatComponents/message";

class MessageController extends  React.Component{
    

    constructor(){
        super();
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
  



}


export default MessageController;