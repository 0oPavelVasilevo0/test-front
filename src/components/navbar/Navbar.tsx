import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa6';
import LogoutButton from '../logout-button/LogoutButton';
import './navbar.css'

const Navbar = () => {
    const location = useLocation();
    return (
        <nav className='navbar'>
            <div className='navbar-menu'>
                <span>
                    {location.pathname !== '/' && (
                        <Link to={"/"}>
                            <button className='menu-btn'>
                                <span className='menu-icon'><FaAngleLeft /></span>
                                <span className='menu-not-text'>назад</span>
                            </button>
                        </Link>
                    )}
                </span>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
