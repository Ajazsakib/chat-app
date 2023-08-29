import React, { useState, useEffect } from 'react';
import ChatFooter from '../components/sidebar/ChatFooter';
import ChatHeader from '../components/sidebar/ChatHeader';
import Sidebar from '../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetailAsync } from '../features/user/userSlice';
import axios from 'axios';
import { getProfileSuccess } from '../features/user/userSlice';
const Index = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const [userProfile, setUserprofile] = useState({});
  const [showprofilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userProfile = useSelector((state) => state.user.userProfile);

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
  console.log(userProfile, 'userProfile');
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
    const res = await axios.post(
      'https://demo-react-ugyr.onrender.com/api/user/update_user',
      updateForm,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2OTMzMDY0MTAsImV4cCI6MTY5MzMxMDAxMH0.oLYhG-zwncRGHQw9Hsj7fdSvb1YKmUdXLvrvx1b0nH8`,
        },
      }
    );
    setEditMode(false);
    setShowProfilePopup(false);
    console.log(res, 'update');
  };

  return (
    <div className="landing-page-section">
      <div className="header-wrap">
        <div className="left">
          <span class="material-symbols-outlined">arrow_back_ios</span>
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
          <div className="chat-body"></div>
          <ChatFooter />
        </div>
      </div>
      {showprofilePopup && (
        <div className="user-profile-popup">
          <div className="profile-box">
            <div className="email">
              <input
                type="text"
                className="form-control"
                value={updateForm?.email}
                disabled={!editMode}
                name="email"
                onChange={handleProfileChange}
              />
            </div>
            <div className="phoneNumber">
              <input
                type="text"
                className="form-control"
                value={updateForm?.phoneNumber}
                disabled={!editMode}
                name="phoneNumber"
                onChange={handleProfileChange}
              />
            </div>
            <div className="update-button">
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={handleUpdateClick}
              >
                Update
              </button>
            </div>

            <span
              class="material-symbols-outlined edit-icon"
              onClick={handleEditClick}
            >
              border_color
            </span>
          </div>
          <span
            className="material-symbols-outlined"
            onClick={closeProfilePopup}
          >
            close
          </span>
        </div>
      )}
    </div>
  );
};

export default Index;
