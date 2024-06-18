import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { User, fetchUsers, resetUsers } from '../../utils/usersSlice';
import UserCard from '../user-card/UserCard';
import './user-list.css';

const UserList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, loading, error, page, totalPages } = useSelector((state: RootState) => state.users);
    const token = useSelector((state: RootState) => state.auth.token);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(resetUsers());
        if (token) {
            dispatch(fetchUsers({ page: currentPage, token }));
        }
    }, [dispatch, currentPage, token]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    if (loading && users.length === 0) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 266px)' }}>Загрузка...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='list-container'>
            <div className='user-list'>
                {users.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>

            {
                currentPage < totalPages ? (
                    <button
                        className='list-btn'
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'показать еще'}
                    </button>
                ) : (
                    <button
                        className='list-btn'
                        onClick={() => setCurrentPage(1)}
                        disabled={loading}>
                        {loading ? 'Загрузка...' : 'назад'}
                    </button>
                )
            }
        </div>
    );
};

export default UserList;

