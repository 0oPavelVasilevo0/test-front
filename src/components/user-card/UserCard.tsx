import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, toggleLike, setCurrentUser } from '../../utils/usersSlice';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import './user-card.css'

interface UserCardProps {
    user: User;
    liked: boolean; // Add liked
}

const UserCard = ({ user, liked }: UserCardProps): JSX.Element => {
    const dispatch = useDispatch();

    const handleViewDetails = () => {
        dispatch(setCurrentUser(user));
    };

    const handleAddLike = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(toggleLike(user.id));
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
                    <button
                        className='like-btn'
                        onClick={handleAddLike}
                    >
                        {liked ? (
                            <GoHeartFill style={{ color: '#512689' }} />
                        ) : (
                            <GoHeart />
                        )}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
