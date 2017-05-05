import React, {Component} from 'react';

class ChatBar extends Component{
  constructor(props){
    super(props);

    this.state = {
      type: '',
      username: '',
      content: '',
      notification: '',
      error: ''
    };

    this.onMessage = this.onMessage.bind(this);
    this.onUserName = this.onUserName.bind(this);
  }

  onMessage(event){
    if(event.key === 'Enter'){
      const content = event.target.value;
      const length = content.length;
      const new_name = this.state.username;
      const cur_name = this.props.username;
      let type = '';
      let notification = '';

      const state = {
        error: ''
      };
      if(length === 0) {
        state.error = `You cannot post an empty message.`;
      }else{
        console.log(cur_name === new_name);
        if(cur_name !== new_name){
          type = 'postNotification';
          notification = cur_name+' changed user name to '+ new_name;
          this.setState.username = new_name;
        }else{
          type = 'postMessage';
        } 
        console.log(type);
        const newMessage = {type: type, username: new_name, content: content, notification: notification};
        this.setState(newMessage);
        this.props.onNewMessage(this.state);
      }
    }
  }

  onUserName(event) {
    this.setState({
      username: event.target.value
    });
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" ref="username" placeholder="Your Name (Optional)" defaultValue={this.state.username} onKeyUp={this.onUserName}/>
        <input className="chatbar-message" ref="content" placeholder="Type a message and hit ENTER" onKeyDown={this.onMessage}/>
      </footer>
    )
  }
}

export default ChatBar;