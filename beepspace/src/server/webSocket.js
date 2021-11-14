
const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:3000'

// We create an exported variable `send`, that we will assign
// later (just know that it is exported for now)
export let send
// The onMessageCallback is also assigned later, as we will soon see
let onMessageCallback

// This exported function is used to initialize the websocket connection
// to the server
export const startWebsocketConnection = () => {
  // A new Websocket connection is initialized with the server
  const ws = new window.WebSocket('ws://' + host + '/') || {}

  // If the connection is successfully opened, we log to the console
  ws.onopen = () => {
    console.log('opened ws connection')
  }

  // If the connection is closed, we log that as well, along with
  // the error code and reason for closure
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason)
  }

  // This callback is called everytime a message is received.
  ws.onmessage = (e) => {
    // The onMessageCallback function is called with the message
    // data as the argument
    onMessageCallback && onMessageCallback(e.data)
  }

  // We assign the send method of the connection to the exported
  // send variable that we definced earlier
  send = ws.send.bind(ws)
}

// This function is called by our React application to register a callback
// that needs to be called everytime a new message is received
export const registerOnMessageCallback = (fn) => {
  // The callback function is supplied as an argument and assigned to the 
  // `onMessageCallback` variable we declared earlier
  onMessageCallback = fn
}