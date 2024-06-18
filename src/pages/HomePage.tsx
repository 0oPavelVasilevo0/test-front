import React from 'react';
import UserList from '../components/user-list/UserList';
import LogoutButton from '../components/logout-button/LogoutButton';

const HomePage = () => {
    return (
        <div className='home-container'>
            <div className='home-nav'>
                <div className='home-nav-btn'>
                    <LogoutButton />
                </div>
                <div className='home-title-container'>
                    <h1 className='title'>
                        Наша Команда
                    </h1>
                    <h2 className='title-description'>
                        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
                    </h2>
                </div>
            </div>
            <UserList />
        </div>
    );
};

export default HomePage;
