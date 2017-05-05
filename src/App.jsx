import React, {Component} from 'react';

import Header from './Header.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component{
    constructor(props) {
    super(props);

    //Set the initial state
    this.state = {
        currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        client_no: ''
    }
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('connection has made');
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if(message.type){
        this.setState({client_no: message.client_no});
      }else{
        const messages = this.state.messages.concat(message);
        this.setState({currentUser: message.username, messages: messages}); 
      }
    }
  }

  onNewMessage(data){
    this.socket.send(JSON.stringify(data));
    this.setState({username: data.username});
  }

  render(){
    return(
      <div>
        <Header client_no= {this.state.client_no}/>
        <MessageList messages= {this.state.messages}/>
        <ChatBar  username={this.state.currentUser} onNewMessage={this.onNewMessage} onMessage={this.onMessage}/>
      </div>
    )
  }
}

export default App;
