import React from "react";


class User extends React.Component{

    username = "";
    email = "";
    number = "";
    birth = "";


    constructor(username,email,number,birth){
        super();
        this.username = username;
        this.email = email;
        this.number = number;
        this.birth = birth;
    }



}


export default User;