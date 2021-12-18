import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
import UserController from "../../Controllers/UserController";

export default function InviteUser(params){
    const requestHandler = new RequestHandler();
    const userController = new UserController();
    var button = null;
    console.log(params.friendsState)

    const addFriend = () =>{
        requestHandler.jSONrequester("Notifications",[
            new ParameterHandler("type", "CREATE"),
            new ParameterHandler("user",userController.getUser().username),
            new ParameterHandler("reciever",params.name),
            new ParameterHandler("date", new Date()),
            new ParameterHandler("content", "new friend request from "+params.name),
            new ParameterHandler("addNotification",1)
        ])
    }


    if(!params.friendsState){
        button = <div class=" tlacitko col-4"><button onClick={addFriend} class="btn btnPridat btn-success">Přidat</button></div>;
        
 }else{
       button = <div class="tlacitko col-4"><button class="btn btnOdebrat btn-gray">Přátelé</button></div>;
    }

    return(

        <div class="row w-100 userLine">
            <div class="col-8">{params.name}</div>
            {button}
            </div>

    );
}