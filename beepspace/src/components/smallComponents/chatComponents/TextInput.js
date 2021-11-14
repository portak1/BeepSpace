import React, { Component } from "react"

export default class TextInput extends Component {
    constructor(props) {
        super(props)
        this.input = React.createRef()
    }

    sendMessage() {
        this.props.onSend && this.props.onSend(this.input.current.value)
        this.input.current.value = ''
    }

    sendMessageIfEnter(e) {
        if (e.keyCode === 13) {
            this.sendMessage()
        }
    }
    render() {
        const sendMessage = this.sendMessage.bind(this)
        const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)


        return (
            <div class="row sendMessageRow mx-auto h-20">

                <input type="text" placeholder="zadejte zprávu zde..." ref={this.input} onKeyDown={sendMessageIfEnter} class=" send-message col-10 mx-auto h-20 "></input>
                <button class="btn btn-odeslat col-2 h-20" onClick={sendMessage}><i class="far fa-paper-plane"></i></button>
            </div>


        )
    }
}