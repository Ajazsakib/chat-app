import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAsync } from '../../features/user/userSlice';

import {
  closeAddMemberPopup,
  closeMemberInGroupPopup,
} from '../../features/group/groupSlice';

const MemberInGroupPopup = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResult = useSelector((state) => {
    return state.user.searchUserResult;
  });

  const closeUserPopup = () => {
    dispatch(closeMemberInGroupPopup());
  };

  const memberInGroup = useSelector((state) => {
    return state.group.memberInGroup;
  });

  return (
    <>
      <h3>Group member</h3>

      <div className="user-list">
        {memberInGroup &&
          memberInGroup.map((user) => {
            return (
              <div key={user.id} className="user-box">
                <div className="username">{user.username}</div>
              </div>
            );
          })}
      </div>
      <div className="close-popup" onClick={closeUserPopup}>
        <span className="material-symbols-outlined">close</span>
      </div>
    </>
  );
};

export default MemberInGroupPopup;
