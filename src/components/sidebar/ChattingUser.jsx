import React, { useEffect } from 'react';
import { openCreateGroupPopup } from '../../features/group/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openUserCreatePopup } from '../../features/chat/userChatSlice';
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
  const dispatch = useDispatch();

  const openGroupPopup = (e) => {
    e.stopPropagation();
    dispatch(openCreateGroupPopup());
  };

  const openUserPopup = (e) => {
    e.stopPropagation();
    dispatch(openUserCreatePopup());
  };

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
            class="material-symbols-outlined add-icon"
            onClick={openGroupPopup}
          >
            add
          </span>
        ) : (
          <span
            class="material-symbols-outlined add-icon"
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
              <div className="group-name">
                <div className="icon">
                  <span class="material-symbols-outlined">{icon}</span>
                </div>
                <div className="text">{c.title}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChattingUser;
