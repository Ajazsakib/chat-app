import React from 'react'

const UpdateUserPopup = (props) =>
{
  const {
    updateForm, editMode, handleProfileChange, handleUpdateClick, handleEditClick, closeProfilePopup
  } = props
  return (
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
  )
}

export default UpdateUserPopup