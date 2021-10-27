function Message(props) {
    var classes = "message";
    var owner = "";
    if (props.last) {
        classes = classes + " last"
    }
    if (props.owner) {
        owner = "mine messages";
    } else {
        owner = "yours messages"
    }
    return (

        <div class={owner}>
            <div class={classes}>
                {props.content}
            </div>
        </div>
    );

}

export default Message;