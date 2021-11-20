import { useState } from "react";


var user;
var reciever;
var chatHandler;
var classes;
function SidebarUser(props) {
    const [online, setOnline] = useState("ball offline");



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
    return (
        <li><a className="userButton" onClick={handleChange}><span class={online}></span>{reciever}</a></li>
    );

}



export default SidebarUser;