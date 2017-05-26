// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const colors = ['green', 'blue', 'yellow', 'red']

// the ws parameter in the callback.
wss.on('connection', sendMessageToClient);


const broadcast = (data) => {
  wss.clients.map( (client) => {
    client.send(data);
  });
}

const countClients = () => {
  const count = wss.clients.size;
  return{
    count
  }
}

const sendMessage = (msg, color) => {
  const message = JSON.parse(msg);
  message.id = uuidV1();
  message.type = String.prototype.replace('post', 'incoming', msg.type);
  message.color = color;
  broadcast(JSON.stringify(message));
}
const sendMessageToClient = (client) => {
  const userColor = colors.sort().pop();
  broadcast(JSON.stringify(countClients()));
  client.on('message', (message) => sendMessage(message, userColor));
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => { broadcast(JSON.stringify(countClients())); });
}