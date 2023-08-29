import React, { useState } from 'react';
import ChattingUser from './ChattingUser';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [isCollapseGroup, setIsCollapseGroup] = useState(false);
  const [isCollapseMsg, setIsCollapseMsg] = useState(false);

  const toggleCollapse = (name) => {
    if (name == 'group') {
      setIsCollapseGroup(!isCollapseGroup);
    }

    if (name == 'directMsg') {
      setIsCollapseMsg(!isCollapseMsg);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        />
        <ChattingUser
          heading="Direct Messages"
          icon="person"
          name="Miranda Cohen"
          isCollapse={isCollapseMsg}
          toggleCollapse={toggleCollapse}
          type="directMsg"
        />
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
