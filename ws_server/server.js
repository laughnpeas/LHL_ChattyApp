// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let CLIENTS = 0;
const data = {type: '', client_no: 0, client_color: '', message: []}
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  CLIENTS+=1;
  data.client_no = CLIENTS;
  data.type = 'client_info';
  wss.clients.forEach( (ws) => {
    ws.send(JSON.stringify(data));
  });
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    msg.id = Math.random();
    msg.type = replaceString('post', 'incoming', msg.type);
    console.log('message from client', msg);
    wss.clients.forEach( function each(client){
      if(client.readyState === ws.OPEN){
        client.send(JSON.stringify(msg));
      }
    })
  })

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    CLIENTS--;
});

});

// Replaces post with incoming in the string messsage
function replaceString(prev, cur, full) {
  for (var i in full) {
    if (full.substring(i, i + prev.length) == prev) {
      full = full.substring(0, i) + cur + full.substring(i + prev.length, full.length);
    }
  }
  return full;
}