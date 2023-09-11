import React, { useState, useEffect } from 'react';
import ChatFooter from '../components/chat/ChatFooter';
import ChatHeader from '../components/chat/ChatHeader';
import Sidebar from '../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserChatAsync,
  getProfileDetailAsync,
  searchUserAsync,
} from '../features/user/userSlice';
import axios from 'axios';
import { getProfileSuccess } from '../features/user/userSlice';
import CreateGroupPopup from '../components/group/CreateGroupPopup';
import { updateProfileDetailAsync } from '../features/user/userSlice';
import UpdateUserPopup from '../components/user/UpdateUserPopup';
import CreateUserPopup from '../components/user/CreateUserPopup';
import ChatBody from '../components/chat/ChatBody';
import AddMemberPopup from '../components/group/AddMemberPopup';
import MemberInGroupPopup from '../components/group/MemberInGroupPopup';
import Popup from '../components/popup/Popup';
import { closeCommonPopup, setToggle } from '../features/chat/userChatSlice';

const popupData = [
  {
    name: 'createUser',
    component: CreateUserPopup,
  },
  {
    name: 'createGroup',
    component: CreateGroupPopup,
  },
  {
    name: 'addMember',
    component: AddMemberPopup,
  },
  {
    name: 'viewMember',
    component: MemberInGroupPopup,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const [userProfile, setUserprofile] = useState({});
  const [showprofilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userProfile = useSelector((state) => state.user.userProfile);
  const [groupName, setGroupName] = useState('');

  const showGroupPopup = useSelector((state) => {
    return state.group.showCreateGroupPopup;
  });

  const showUserPopup = useSelector((state) => {
    return state.userChat.showUserCreatePopup;
  });

  const showAddmemberPopup = useSelector((state) => {
    return state.group.showAddmemberPopup;
  });

  const showMembarInGroup = useSelector((state) => {
    return state.group.showMembarInGroup;
  });

  const showPopup = useSelector((state) => {
    return state.userChat.showPopup;
  });

  const GetComponentToShow =
    popupData.find((popup) => {
      return popup.name === showPopup;
    })?.component || null;

  const [updateForm, setUpdateform] = useState({
    email: userProfile?.email || '',
    phoneNumber: userProfile?.phoneNumber || '',
  });

  const dispatch = useDispatch();

  const renderPage = async () => {
    setTimeout(() => {
      if (!token) {
        navigate('/login');
      }
    }, 1000);
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

  // Handle Popup Code

  const [searchQuery, setSearchQuery] = useState('');

  const searchResult = useSelector((state) => {
    return state.user.searchUserResult;
  });

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
  const closePopup = (type) => {
    if (type === 'createSingleChat') {
      dispatch(closeCommonPopup());
    }
  };

  const handleGroupChange = (e) => {
    setGroupName(e.target.value);
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

      {showPopup && (
        <Popup>{GetComponentToShow && <GetComponentToShow />}</Popup>
      )}
    </div>
  );
};

export default Index;
