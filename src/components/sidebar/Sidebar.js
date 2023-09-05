import React, { useEffect, useState } from 'react';
import ChattingUser from './ChattingUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatAsync } from '../../features/chat/userChatSlice';
const Sidebar = () => {
  const [isCollapseGroup, setIsCollapseGroup] = useState(true);
  const [isCollapseMsg, setIsCollapseMsg] = useState(true);
  const [allChat, setAllChat] = useState([]);
  const [groupChat, setGroupChat] = useState([]);
  const [userChat, setUserChat] = useState([]);

  const getAllChat = useSelector((state) => {
    return state.userChat.getAllChat;
  });

  const getAllGroupChat = useSelector((state) => {
    return state.group.groupChat;
  });

  const getAllUserChat = useSelector((state) => {
    return state.user.userChat;
  });

  const dispatch = useDispatch();

  const toggleCollapse = (name) => {
    if (name == 'group') {
      setIsCollapseGroup(!isCollapseGroup);
    }

    if (name == 'oneToOne') {
      setIsCollapseMsg(!isCollapseMsg);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  const getChats = async () => {
    dispatch(fetchChatAsync());

    // setAllChat(res.data.getChat);
    const groupChatFilter =
      getAllChat && getAllChat.filter((chat) => chat.chatType === 'GroupChat');
    setGroupChat(groupChatFilter);
    const userChatFilter =
      getAllChat &&
      getAllChat.filter((chat) => {
        return chat.chatType === 'OneToOne';
      });
    setUserChat(userChatFilter);
  };

  useEffect(() => {
    getChats();
  }, [getAllChat.length, getAllGroupChat, getAllUserChat]);

  return (
    <>
      <div className="username">
        <div className="left">
          <h3>Saquib</h3>
        </div>
        <div className="right">
          <span className="material-symbols-outlined">edit_square</span>
        </div>
      </div>
      {/* End of username  */}
      <div className="group-parent">
        <ChattingUser
          heading="Groups"
          icon="group"
          name="Group Name"
          isCollapse={isCollapseGroup}
          toggleCollapse={toggleCollapse}
          type="group"
          chat={groupChat}
        />
        <ChattingUser
          heading="Direct Messages"
          icon="person"
          name="Miranda Cohen"
          isCollapse={isCollapseMsg}
          toggleCollapse={toggleCollapse}
          type="oneToOne"
          chat={userChat}
        />
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
