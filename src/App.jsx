import React, {Component} from 'react';

import Header from './Header.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component{
    constructor(props) {
    super(props);

    //Set the initial state
    this.state = {
        currentUser: {name: 'Sean'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        client_no: '',
        color:''
    }
  }

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.opopen = this.sendUserName;
    this.socket.onMessage = this.sendNewMessage;
  }

  updateMessage = (message) => {
    const newMessage = JSON.parse(message.content);
    if(newMessage.type === 'systemMessage'){
      this.setState({count: newMessage.count})
    }else{
      this.setState({messages: this.state.messages.concat(newMessage)})
    }
  }

  sendJoinMessage =() => {
    const newMessage = {
      type: 'postNotification',
      user: this.state.currentUser.name,
      content: `${this.state.currentUser.name} has joined`
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  sendNewMessage = (content) => {
    const newMessage = {
      type: 'postMessage',
      user: this.state.currentUser.name,
      content: content
    };
    this.socket.send(JSON,stringify(newMessage));
  }

  sendUserName = (name) => {
    const content = `${this.state.currentUser.name} has changed their name to ${username}.`;
    const newMessage = {
      type: 'postNotification',
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    this.setState({currentUser: {name: name}});
  }

  render(){
    return(
      <div>
        <Header client_no= {this.state.count}/>
        <MessageList messages= {this.state.messages}/>
        <ChatBar  currentUser={this.state.currentUser} 
                  onNewMessage={this.onNewMessage} 
                  onSendUser={this.onSendUserName}/>
      </div>
    )
  }
}

