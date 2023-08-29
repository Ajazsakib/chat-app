import React from 'react';

const ChattingUser = ({
  heading,
  icon,
  name,
  isCollapse,
  toggleCollapse,
  type,
}) => {
  return (
    <div className="group">
      <div
        className="group-heading"
        onClick={() => {
          toggleCollapse(type);
        }}
      >
        <p>
          <span className="material-symbols-outlined">
            {isCollapse ? 'expand_more' : 'keyboard_arrow_right'}
          </span>
          {heading}
        </p>
        <span class="material-symbols-outlined">add</span>
      </div>
      <div className={`group-list ${isCollapse ? 'show' : ''}`}>
        <div className="group-name">
          <div className="icon">
            <span class="material-symbols-outlined">{icon}</span>
          </div>
          <div className="text">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default ChattingUser;
