import React, {Component} from 'react';

class ChatBar extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: props.currentUser.name,
      content: ''
    };

    this.onMessage = this.onMessage.bind(this);
    this.onUserName = this.onUserName.bind(this);
  }

  setNewContent(event){
    this.setState({content: event.target.value})
  }
  
  sendNewMessage(event){
    if(event.key === 'Enter'){
      this.props.sendNewMessage(this.state.content);
      this.setState({content: ''});
    }
  }

  setUserName(event){
    this.setState({user: event.target.value});
  }

  sendUserName(event){
    this.props.sendUserName(this.state.user);
    event.target.value = '';
  }


  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" 
               placeholder={this.props.currentUser.name} 
               onKeyUp={this.setUserName}
               onBlur={this.sendUserName}/>
        <input className="chatbar-message" 
               ref="content" 
               placeholder="Type a message and hit ENTER" 
               onKeyDown={this.sendNewMessage}
               value={this.state.content}/>
      </footer>
    )
  }
}

export default ChatBar;