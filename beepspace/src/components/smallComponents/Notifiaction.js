import RequestHandler from "../../Handlers/RequestHandler";
import ParameterHandler from "../../Handlers/ParameterHandler";
import UserController from "../../Controllers/UserController";

export default function Notification(props) {

    var notification;
    const requestHandler = new RequestHandler();
    const userController = new UserController();

    const addFriend = () => {
        requestHandler.jSONrequester("Notifications", [
            new ParameterHandler("type", "CONFIRM"),
            new ParameterHandler("user", props.user),
            new ParameterHandler("reciever", userController.getUser().username),
            new ParameterHandler("id", props.notId)
        ])
        props.socket.emit("addUser", {
            localUser: userController.getUser().username,
            username: props.user
        })
        props.removeNotification(props.notId);
    }

    const declineFriend = () => {
        requestHandler.jSONrequester("Notifications", [
            new ParameterHandler("type", "REMOVEONE"),
            new ParameterHandler("id", props.notId),
        ])

        props.removeNotification(props.notId);
    }



    if (props.addNotification) {
        return (<div class="row w-100 userLine">
            <div class="col-2"><i class="fas fa-user-friends"></i></div>
            <div class="col-4">{props.user}</div>
            <div class=" tlacitko col-3"><button onClick={addFriend} class="btn w-100 btnPridat btnPrijmout btn-success"><i class="fas fa-check"></i></button></div>
            <div class="tlacitko col-3"><button onClick={declineFriend} class="btn w-100 btnOdebrat btnOdmitnout btn-gray"><i class="fas fa-times"></i></button></div>

        </div>);

    }

    return (
        <div class="row w-100 userLine">
            <div class="col-2"><i class="fas fa-envelope"></i></div>
            <div class="col-4">{props.user}</div>
            <div class="col-6 notificationText">{props.content}</div>

        </div>

    );
}