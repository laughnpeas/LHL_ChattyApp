### Web Socket
github.com/websocket/ws
*MDN Doc: websocket interface

ref: WebRTC

@server.js
```

require express, ws

//websocket logic
 const wss = new ws.Server({
   server: app
 });
let sharedContent = '';

function broadCast(data){
  for(let client of wss.clients){
    client.send(data);s
  }
}

function handleMessage(data){
  console.log('Message received', data);
  sharedContent = data;
  broadCast(data);
}

function hadleConnection(client){
  console.log("nNew client has connected);
  console.log('We are at', client.size());
  client.on('message', handleMessage);
  client.send(sharedContent);

}
wss.on('connection', handleConnection);

```

@client side : window.websocket

```
const ws = new WebSocket("ws://localhost:3000");

function setupApp(){
  <!--ws.send('hello from client'); //-->
  $('#typehere).on('input', function(){
    const val = #(this).val();
    <!--console.log(val);-->
    ws.send(val);
  });
}

wss.onOpen(event){
  console.log('Estableished connection', event);
  setupApp();
}

//Handleing incoming data to show up in our app
ws.onmessage = function(event){
  <!--console.log('ON medssage called!');//server sends current state-->
  $('#typehere).val(event.data);
}

```
** consideration: state managing
### Project Idea
realtime, usgin bot, recognition, 