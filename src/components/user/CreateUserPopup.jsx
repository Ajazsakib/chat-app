import React, { useState } from 'react';
import { closeUserCreatePopup } from '../../features/chat/userChatSlice';
import { useDispatch } from 'react-redux';

const CreateUserPopup = () =>
{
    const dispatch = useDispatch()

    const closeUserPopup = () =>
    {
        dispatch(closeUserCreatePopup())
    }

    return (
        <div className='create-user-popup'>
            <div className='create-user-popup-box'>

                <div className='search-user'>
                    <input type='text' className='form-control' placeholder='Search User...' />
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </div>
                <div className='user-list'>
                    <div className='user-box'>
                        <div className='username'>
                            Saquib
                        </div>
                    </div>
                    <div className='user-box'>
                        <div className='username'>
                            Saquib
                        </div>
                    </div>
                    <div className='user-box'>
                        <div className='username'>
                            Saquib
                        </div>
                    </div>
                    <div className='user-box'>
                        <div className='username'>
                            Saquib
                        </div>
                    </div>
                </div>

                <div className='close-popup' onClick={closeUserPopup}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CreateUserPopup