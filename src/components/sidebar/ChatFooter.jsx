import React from 'react';

const ChatFooter = () => {
  return (
    <div className="chat-footer">
      <div className="input-chat">
        <input
          type="text"
          className="form-control"
          placeholder="Type Here..."
        />
      </div>
      <div className="send-button">
        <span class="material-symbols-outlined">send</span>
      </div>
    </div>
  );
};

export default ChatFooter;
