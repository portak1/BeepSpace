import AOS from 'aos';
import { useEffect } from 'react';

function Message(props) {

    useEffect(() => {
        AOS.init();
    }, []);


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

        <div data-aos={"fade-down"} class={owner}>
            <div class={classes}>
                {props.content}
            </div>
        </div>
    );

}

export default Message;