import { useState } from "react";


var user;
var reciever;
var chatHandler;
var classess;
function SidebarUser(props) {

    if(props.online == 1){
        classess = "ball online"
    }else if(props.online == 0){
        classess = "ball offline"
    }else{
        classess = "ball paused"
    }
    const [online, setOnline] = useState(props.online ? "ball online" :"ball offline"); 



    user = props.user;
    reciever = props.reciever;
    chatHandler = props.chatHandler;
    const handleChange = () => props.handleInputUser(props.reciever);


    props.socket.on("clientOnline", function (data) {
        if (data.user != user)
            if (data.user == props.reciever) {
                setOnline("ball online");
            }
    })

    props.socket.on("clientOffline", function (data) {
        if (data.user != user)
            if (data.user == props.reciever) {
                setOnline("ball offline");
            }
    })

    props.socket.on("clientPause", function (data) {
        if (data.user != user)
            if (data.user == props.reciever) {
                setOnline("ball paused");
            }
    })

    return (
        <li><a className="userButton" onClick={handleChange}><span class={online}></span>{reciever}</a></li>
    );

}



export default SidebarUser;