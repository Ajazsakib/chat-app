import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const ChatHeader = () => {
  const userProfile = useSelector((state) => state.user.userProfile);
  return (
    <div className="chat-header">
      <div className="text">{userProfile?.username}</div>
    </div>
  );
};

export default ChatHeader;
