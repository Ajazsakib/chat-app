import React from 'react';
import { useDispatch } from 'react-redux';
import { closeCommonPopup } from '../../features/chat/userChatSlice';
const Popup = ({ children }) => {
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(closeCommonPopup());
  };

  return (
    <div className="create-user-popup">
      <div className="create-user-popup-box">
        {children}

        <div className="close-popup" onClick={closePopup}>
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
