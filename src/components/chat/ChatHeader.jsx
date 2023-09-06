import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openAddMemberPopup,
  closeAddMemberPopup,
} from '../../features/group/groupSlice';
import { fetchGroupMemberAsync } from '../../features/group/groupSlice';
import {
  openMemberInGroupPopup,
  closeMemberInGroupPopup,
} from '../../features/group/groupSlice';
const ChatHeader = () => {
  const userProfile = useSelector((state) => state.user.userProfile);

  const chatIsGroup = useSelector((state) => state.userChat.chatIsGroup);

  const chatId = useSelector((state) => {
    return state.userChat.chatId;
  });

  const dispatch = useDispatch();

  const memberInGroup = useSelector((state) => {
    return state.group.memberInGroup;
  });

  const groupChatTitle = useSelector((state) => {
    return state.userChat.groupChatTitle;
  });

  const handleAddMemberPopup = () => {
    dispatch(openAddMemberPopup());
  };

  const handleMemberInGroupPopup = () => {
    dispatch(openMemberInGroupPopup());
  };

  return (
    <div className="chat-header">
      <div className="text">{groupChatTitle}</div>
      {chatIsGroup && (
        <div className="icon">
          <span
            class="material-symbols-outlined"
            onClick={handleAddMemberPopup}
          >
            add
          </span>
          <span className="view-member" onClick={handleMemberInGroupPopup}>
            {memberInGroup.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
