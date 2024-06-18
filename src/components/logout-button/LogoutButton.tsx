// components/LogoutButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../utils/authSlice';
import { AppDispatch } from '../../store/store';
import { IoMdExit } from "react-icons/io";

import './logout-btn.css'

const LogoutButton: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return <button
        className='logout-btn'
        onClick={handleLogout}
    >
        <span className='btn-icon'><IoMdExit /></span>
       <span className='btn-not-text'>Выход</span>
    </button>;
};

export default LogoutButton;