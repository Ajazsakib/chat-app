import React from 'react';
import { useDispatch } from 'react-redux';
import { closeUserCreatePopup } from '../../features/chat/userChatSlice';
const Popup = ({
  handleSearchChange,
  searchResult,
  createUserChat,
  closePopup,
  type,
  groupName,
  handleGroupChange,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="create-user-popup">
      <div className="create-user-popup-box">
        <div className="search-user">
          <input
            type="text"
            className="form-control"
            placeholder="Search User..."
            onChange={handleSearchChange}
          />
          <span className="material-symbols-outlined">search</span>
        </div>

        <div className="user-list">
          {searchResult?.users &&
            searchResult?.users.map((user) => {
              return (
                <div
                  key={user.id}
                  className="user-box"
                  onClick={() => {
                    createUserChat(user.id, user.username);
                  }}
                >
                  <div className="username">{user.username}</div>
                </div>
              );
            })}
        </div>
        <div
          className="close-popup"
          onClick={() => {
            closePopup(type);
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
