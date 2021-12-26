import $ from 'jquery';
import React from 'react';

class RequestHandler extends React.Component {

    url = 'http://172.20.10.3/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/';
    pcUrl = 'http://10.0.2.15/githubProjects/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/';
    constructor() {
        super();
    }



    jSONrequester(requestType, requestParameter) {
        var returnData = false;
        $.ajax({
            url: this.pcUrl + requestType + "?" + this.parameterForming(requestParameter),
            async: false,

            success: function(data) {
                returnData = data;
            }
        });
        return returnData;

    }


    parameterForming(parametersArray) {
        var returnString = "";
        if (parametersArray.length > 0) {
            for (let i = 0; i < parametersArray.length; i++) {
                if (i + 1 == parametersArray.length) {
                    returnString = returnString + parametersArray[i].parameterName + "=" + parametersArray[i].parameterContent;

                } else {
                    returnString = returnString + parametersArray[i].parameterName + "=" + parametersArray[i].parameterContent + "&";

                }
            }
        }

        return returnString;
    }


}

export default RequestHandler;