import React, { useState, useEffect } from 'react';
import { closeCommonPopup, setToggle } from '../../features/chat/userChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAsync } from '../../features/user/userSlice';
import { setSearchResults } from '../../features/user/userSlice';
import { createUserChatAsync } from '../../features/user/userSlice';
import axios from 'axios';
const CreateUserPopup = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const [allUser, setAllUsers] = useState([]);

  const searchResult = useSelector((state) => {
    return state.user.searchUserResult;
  });

  const closePopup = () => {
    dispatch(closeCommonPopup());
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log(query, 'query');
    setSearchQuery(query);
    if (query !== '' || query !== undefined) {
      dispatch(searchUserAsync(query));
    }
  };

  const createUserChat = (id, name) => {
    console.log(typeof id);
    const userData = {
      chatType: 'OneToOne',
      userIds: [id],
      title: name,
    };

    dispatch(createUserChatAsync(userData));
    dispatch(closeCommonPopup());
    dispatch(setToggle());
  };

  console.log(searchResult.users);
  return (
    <>
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
        {searchResult.users &&
          searchResult.users.map((user) => {
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
    </>
  );
};

export default CreateUserPopup;
