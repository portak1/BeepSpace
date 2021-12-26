import { useEffect } from "react";

export default function SidebarGroupchat(props){

  const handleChange =()=> props.handleInputGroupchat(props.groupchatID,props.name)


    return(<li ><a  href="#" onClick={handleChange}>{props.name}<span></span></a></li>) ;

}