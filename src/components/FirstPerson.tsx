import  React, { useState, useLayoutEffect } from  "react";
import chatStore from '../store/chat'

const FirstPerson = () => {
  const [ chatState, setChatState ] = useState(chatStore.initialState);
  const [ chatMessage, setChatMessage ] = useState("")

  useLayoutEffect(()=> {
    chatStore.subscribe(setChatState);
    chatStore.init();
  },[]);


  const onFormSubmit = (event) => {
    event.preventDefault();
    const messageObject = {
      person: 'first-person',
      text: chatMessage.trim(),
    };
    setChatMessage("")
    chatStore.sendMessage(messageObject);
    // document.getElementById('messageForm').reset();
  };

  const onMessageInput = (event) =>{
    setChatMessage(event.target.value)
  }

  return (
    <div className="container">
      <h2>Mycroft</h2>
      <div className="chat-box">
        {chatState.data.map(message => (
          <div>
            <p className={message.person}>{message.text}</p>
            <div className="clear"></div>
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <input
          type="text"
          id="messageInput"
          name="messageInput"
          value = {chatMessage}
          onChange = {(event) => onMessageInput(event)}
          placeholder="type here..."
          required
        />
        <button type="submit">Send</button> <br />
        <button className="clear-button" onClick={() => chatStore.clearChat()}>
          Clear Chat
        </button>
      </form>
    </div>
  );
}

export  default  FirstPerson;
