import React, {Component} from 'react';

class Message extends Component{
  render(){
    return(
      <div>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          {this.props.notification}
        </div>
      </div>
    );
  }
}

export default Message;