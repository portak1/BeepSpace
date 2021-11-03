
import $ from 'jquery';
import React from 'react';

class RequestHandler extends  React.Component{
    basicUrl = "";
    

    constructor(basicUrl){
        super();
        this.basicUrl = basicUrl;
    }
    


    jSONrequester(requestType, requestParameter){
    var returnData = false;
  
    $.ajax({
        url:this.basicUrl + requestType + "?" + this.parameterForming(requestParameter),
        async: false,
  
        success: function (data) {
            returnData = data;
        }
    });
    return returnData;
  
    }


    parameterForming(parametersArray){
        var returnString = "";
        if(parametersArray.length >0){
            for(let i = 0; i < parametersArray.length; i++){
                returnString = returnString + parametersArray[i].parameterName + "="+ parametersArray[i].parameterContent + "&";
                if(i+1 == parametersArray.length ){
                    returnString = returnString + parametersArray[i].parameterName + "="+ parametersArray[i].parameterContent;

                }
            }
        }

        return returnString;
    }


}

export default RequestHandler;