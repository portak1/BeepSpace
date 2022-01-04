import React from "react";


class User extends React.Component{

    username = "";
    email = "";
    number = "";
    birth = "";
    id = null;
    

    constructor(username,email,number,birth, id){
        super();
        this.username = username;
        this.email = email;
        this.number = number;
        this.birth = birth;
        this.id = id;
    }



}


export default User;