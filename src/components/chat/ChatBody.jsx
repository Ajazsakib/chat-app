import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatBody = () => {
  const getAllMessages = useSelector((state) => {
    return state.userChat.getAllMessages;
  });

  console.log(getAllMessages, '>>>>>>>>>>>>>');

  return (
    <>
      {getAllMessages &&
        getAllMessages.map((msg) => {
          return (
            <div className="msg-box">
              <div className="name">{msg.userSender.username}</div>
              <div className="message">{msg.message}</div>
            </div>
          );
        })}
    </>
  );
};

export default ChatBody;
