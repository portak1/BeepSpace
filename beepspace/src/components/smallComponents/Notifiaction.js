

export default function Notification(props) {

    var notification;

    if (props.addNotification) {
        return (<div class="row w-100 userLine">
            <div class="col-2"><i class="fas fa-user-friends"></i></div>
            <div class="col-4">{props.user}</div>
            <div class=" tlacitko col-3"><button class="btn w-100 btnPridat btnPrijmout btn-success"><i class="fas fa-check"></i></button></div>
            <div class="tlacitko col-3"><button class="btn w-100 btnOdebrat btnOdmitnout btn-gray"><i class="fas fa-times"></i></button></div>

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