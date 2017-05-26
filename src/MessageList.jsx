import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component{
  
  render(){
    const messages = this.props.messages.map(message => {
      console.log(message.type);
      return 
        <Message
          key={ message.id }
          type={message.type}
          username={ message.username }
          content={ message.content }
          notification={ message.notification }
          color={message.color}
        />
    })

    return(
      <main className="messages">
        { messages }
      </main>
    )
  }
}

export default MessageList;