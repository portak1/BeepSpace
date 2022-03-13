import $ from 'jquery';
import React from 'react';
import { enviroment } from '../enviroments/enviroment';

class RequestHandler extends React.Component {
  constructor() {
    super();
  }

  async jSONrequester(requestType, requestParameter) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:
          enviroment.API_ENDPOINT +
          requestType +
          '?' +
          this.parameterForming(requestParameter),
        async: true,

        success: (data) => {
          resolve(data);
        },
        error: (data) => {
          reject(data);
        },
      });
    });
  }

  parameterForming(parametersArray) {
    var returnString = '';
    if (parametersArray.length > 0) {
      for (let i = 0; i < parametersArray.length; i++) {
        if (i + 1 == parametersArray.length) {
          returnString =
            returnString +
            parametersArray[i].parameterName +
            '=' +
            parametersArray[i].parameterContent;
        } else {
          returnString =
            returnString +
            parametersArray[i].parameterName +
            '=' +
            parametersArray[i].parameterContent +
            '&';
        }
      }
    }

    return returnString;
  }
}

export default RequestHandler;
