import React, { useState, useEffect } from 'react';
import ChatFooter from '../components/chat/ChatFooter';
import ChatHeader from '../components/chat/ChatHeader';
import Sidebar from '../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetailAsync } from '../features/user/userSlice';
import axios from 'axios';
import { getProfileSuccess } from '../features/user/userSlice';
import CreateGroupPopup from '../components/group/CreateGroupPopup';
import { updateProfileDetailAsync } from '../features/user/userSlice';
import UpdateUserPopup from '../components/user/UpdateUserPopup';
import CreateUserPopup from '../components/user/CreateUserPopup';
import ChatBody from '../components/chat/ChatBody';
const Index = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const [userProfile, setUserprofile] = useState({});
  const [showprofilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userProfile = useSelector((state) => state.user.userProfile);

  const showGroupPopup = useSelector((state) => {
    return state.group.showCreateGroupPopup;
  });

  const showUserPopup = useSelector((state) => {
    return state.userChat.showUserCreatePopup;
  });

  const [updateForm, setUpdateform] = useState({
    email: userProfile?.email || '',
    phoneNumber: userProfile?.phoneNumber || '',
  });

  const dispatch = useDispatch();

  const renderPage = async () => {
    if (!token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    renderPage();
  }, []);

  // const getProfileDetails = async () => {
  //   const res = await axios.get(
  //     'https://demo-react-ugyr.onrender.com/api/user/userDetails',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log(res.data.user);
  //   setProfileUser(res.data.user);
  // };

  useEffect(() => {
    dispatch(getProfileDetailAsync(token));
    dispatch(getProfileSuccess());
  }, [token, dispatch]);

  const openProfilePopup = () => {
    setShowProfilePopup(true);
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleProfileChange = (e) => {
    setUpdateform((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userProfile?.email || userProfile?.phoneNumber) {
      setUpdateform({
        email: userProfile?.email || '',
        phoneNumber: userProfile?.phoneNumber || '',
      });
    }
  }, [userProfile]);

  const handleUpdateClick = async () => {
    // Perform update logic, e.g., update the user profile on the server
    dispatch(updateProfileDetailAsync(updateForm));
    setEditMode(false);
    setShowProfilePopup(false);
  };

  return (
    <div className="landing-page-section">
      <div className="header-wrap">
        <div className="left">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <div className="center">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
            />
          </div>
        </div>
        <div className="right">
          <div className="username" onClick={openProfilePopup}>
            <p>{userProfile?.username}</p>
          </div>
        </div>
      </div>
      <div className="chat-section">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chat-body">
          <ChatHeader />
          <div className="msg-section">
            <ChatBody />
          </div>
          <ChatFooter />
        </div>
      </div>
      {showprofilePopup && (
        <UpdateUserPopup
          updateForm={updateForm}
          editMode={editMode}
          handleProfileChange={handleProfileChange}
          handleUpdateClick={handleUpdateClick}
          handleEditClick={handleEditClick}
          closeProfilePopup={closeProfilePopup}
        />
      )}

      {showGroupPopup && <CreateGroupPopup />}

      {showUserPopup && <CreateUserPopup />}
    </div>
  );
};

export default Index;
