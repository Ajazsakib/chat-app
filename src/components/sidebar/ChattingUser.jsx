import React, { useState, useEffect } from 'react';
import { openCreateGroupPopup } from '../../features/group/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openUserCreatePopup } from '../../features/chat/userChatSlice';
import { fetchMsgAsync } from '../../features/chat/userChatSlice';
import { fetchChatId } from '../../features/chat/userChatSlice';
import { setReceiverId } from '../../features/chat/userChatSlice';
import axios from 'axios';
const ChattingUser = ({
  heading,
  icon,
  name,
  isCollapse,
  toggleCollapse,
  type,
  chat,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const openGroupPopup = (e) => {
    e.stopPropagation();
    dispatch(openCreateGroupPopup());
  };

  const openUserPopup = (e) => {
    e.stopPropagation();
    dispatch(openUserCreatePopup());
  };

  const chatId = useSelector((state) => {
    return state.userChat.chatId;
  });

  const fetchMessage = (id, rcvId) => {
    localStorage.setItem('currentChatId', id);
    dispatch(fetchMsgAsync(id));
    dispatch(fetchChatId(id));
    dispatch(setReceiverId(rcvId));
  };

  useEffect(() => {
    const directMessageChat =
      chat && chat.filter((c) => c.chatType === 'OneToOne');

    if (directMessageChat.length > 0) {
      const firstDirectMessageChat = directMessageChat[0];
      const { id } = firstDirectMessageChat;

      fetchMessage(id);
    }
  }, [chat]);

  console.log(chat);

  return (
    <div className="group">
      <div
        className="group-heading"
        onClick={() => {
          toggleCollapse(type);
        }}
      >
        <p>
          <span className="material-symbols-outlined">
            {isCollapse ? 'expand_more' : 'keyboard_arrow_right'}
          </span>
          {heading}
        </p>
        {type == 'group' ? (
          <span
            className="material-symbols-outlined add-icon"
            onClick={openGroupPopup}
          >
            add
          </span>
        ) : (
          <span
            className="material-symbols-outlined add-icon"
            onClick={openUserPopup}
          >
            add
          </span>
        )}
      </div>
      <div className={`group-list ${isCollapse ? 'show' : ''}`}>
        {chat &&
          chat.map((c) => {
            return (
              <div
                key={c.id}
                className={`group-name ${chatId === c.id ? 'active' : ''}`}
              >
                <div className="icon">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div
                  className="text"
                  onClick={() => {
                    fetchMessage(c.id, c.userReceiver.id);
                  }}
                >
                  {c.title}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChattingUser;
