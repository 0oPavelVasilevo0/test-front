import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { User, fetchUsers, resetUsers } from '../../utils/usersSlice';
import UserCard from '../user-card/UserCard';
import { GoChevronRight } from "react-icons/go"
import './user-list.css';

const UserList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, loading, error, totalPages, likes } = useSelector((state: RootState) => state.users);
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

    const handleResetPage = () => {
        setCurrentPage(1);
        dispatch(resetUsers());
    };

    const load = (
        <div className='error-load'>Загрузка...</div>
    )

    if (error) {
        return <div className='error-load' style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className='list-container'>
            {(loading && users.length === 0) ? load :
                (<div className='user-list'>
                    {users.map((user: User) => (
                        <UserCard key={user.id} user={user} liked={!!likes[user.id]} />
                    ))}
                </div>)}
            {currentPage < totalPages ? (
                <button
                    className='list-btn'
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    {loading ? 'Загрузка...' :
                        <>
                            <span>показать еще</span><GoChevronRight fontSize={'22px'} />
                        </>
                    }
                </button>
            ) : (
                <button
                    className='list-btn'
                    onClick={handleResetPage}
                    disabled={loading}>
                    {loading ? 'загрузка...' : 'назад'}
                </button>
            )
            }
        </div>
    );
};

export default UserList;

