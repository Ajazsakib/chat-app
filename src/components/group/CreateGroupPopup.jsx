import React, { useState } from 'react';
import {
  closeCreateGroupPopup,
  createGroupAsync,
  success,
} from '../../features/group/groupSlice';
import { useDispatch } from 'react-redux';
const CreateGroupPopup = () => {
  const [groupName, setGroupName] = useState('');

  const dispatch = useDispatch();
  const closeGroupPopup = () => {
    dispatch(closeCreateGroupPopup());
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(groupName);
    let groupData = {
      chatType: 'GroupChat',
      title: groupName,
    };

    dispatch(createGroupAsync(groupData));
    dispatch(closeCreateGroupPopup());
  };

  return (
    <div className="create-group-popup">
      <div className="create-group-popup-box">
        <div className="header"></div>
        <div className="body">
          <input
            type="text"
            className="form-control"
            placeholder="Group Name"
            value={groupName}
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="footer">
          <button className="btn btn-success" onClick={closeGroupPopup}>
            Cancel
          </button>
        </div>
        <div className="close-popup" onClick={closeGroupPopup}>
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPopup;
