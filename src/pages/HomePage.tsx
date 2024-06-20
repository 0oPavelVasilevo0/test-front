import UserList from '../components/user-list/UserList';

const HomePage = () => {
    return (
        <div className='home-container'>
            <header className='home-header'>
                <div className='home-title-container'>
                    <h1 className='title'>
                        Наша Команда
                    </h1>
                    <h2 className='title-description'>
                        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
                    </h2>
                </div>
            </header>
            <UserList />
        </div>
    );
};

export default HomePage;
