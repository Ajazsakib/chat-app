import React, { useState } from 'react';
import { sendMessageAsync } from '../../features/chat/userChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMsgAsync } from '../../features/chat/userChatSlice';

const ChatFooter = () => {
  const [msg, setMsg] = useState('');

  const dispatch = useDispatch();

  const chatId = useSelector((state) => {
    return state.userChat.chatId;
  });

  const rcvId = useSelector((state) => {
    return state.userChat.rcvId;
  });

  console.log(chatId);

  const sendMessage = (e) => {
    const messageDetails = {
      message: msg,
      chatId: chatId,
    };

    dispatch(sendMessageAsync(messageDetails));
    dispatch(fetchMsgAsync(chatId));

    setMsg('');
  };

  return (
    <div className="chat-footer">
      <div className="input-chat">
        <input
          type="text"
          className="form-control"
          placeholder="Type Here..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
      </div>
      <div className="send-button" onClick={sendMessage}>
        <span className="material-symbols-outlined">send</span>
      </div>
    </div>
  );
};

export default ChatFooter;
