import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAsync } from '../../features/user/userSlice';
import {
  closeCommonPopup,
  closeUserCreatePopup,
  setToggle,
} from '../../features/chat/userChatSlice';
import { closeAddMemberPopup } from '../../features/group/groupSlice';
import { addMemberInGroupAsync } from '../../features/chat/userChatSlice';

const AddMemberPopup = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResult = useSelector((state) => {
    return state.user.searchUserResult;
  });

  const closeUserPopup = () => {
    dispatch(closeAddMemberPopup());
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log(query, 'query');
    setSearchQuery(query);
    if (query !== '' || query !== undefined) {
      dispatch(searchUserAsync(query));
    }
  };

  const groupChatTitle = useSelector((state) => {
    return state.userChat.groupChatTitle;
  });

  const addMemberInGroup = (userId) => {
    console.log(userId, groupChatTitle);
    const data = {
      usersId: [userId],
      title: groupChatTitle,
    };

    dispatch(addMemberInGroupAsync(data));
    dispatch(closeCommonPopup());
  };

  return (
    <>
      <h3>Add Member In Group</h3>
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
              <div key={user.id} className="user-box">
                <div
                  className="username"
                  onClick={() => {
                    addMemberInGroup(user.id);
                  }}
                >
                  {user.username}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AddMemberPopup;
