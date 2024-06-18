import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, setCurrentUser } from '../../utils/usersSlice';
import { GoHeart } from "react-icons/go";
import './user-card.css'

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const dispatch = useDispatch();

    const handleViewDetails = () => {
        dispatch(setCurrentUser(user));
    };

    return (
        <Link to={`/user/${user.id}`} onClick={handleViewDetails}>
            <div className='card'>
                <img
                    style={{ borderRadius: '50%' }}
                    height={'124px'}
                    width={'124px'}
                    src={user.avatar}
                    alt={user.first_name}
                />
                <h2 className='name'>
                    {user.first_name} {user.last_name}
                </h2>
                <div className='card-like'>
                    <button className='like-btn'><GoHeart /></button>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
