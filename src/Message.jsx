import React, {Component} from 'react';

class Message extends Component{
  render(){
    const classState = this.props.type === 'incomingMessage' 
                      ? 'message'
                      : 'message system';
    return(
    <div className={classState}>
      {this.props.type === 'incomingNotification' && this.props.content}
      {this.props.type === 'incomingMessage' &&
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      }
    </div>
    );
  }
}

export default Message;