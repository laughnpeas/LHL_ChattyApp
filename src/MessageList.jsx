import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component{
  
  render(){
    const messages = this.props.messages.map(message => {
      console.log(message.type);
      // console.log(message.username);
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content }
        notification={ message.notification }
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