import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUsers } from '../utils/usersSlice';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers({ page: 1, token }));
        }
    }, [dispatch, token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Наша команда</Link></li>
                {(currentUser) ? (
                    <li>
                        <img src={currentUser.avatar} alt={currentUser.first_name} />
                        {currentUser.first_name} {currentUser.last_name}
                    </li>
                ) : (
                    <li>Нет данных о пользователе</li>
                )}
                {token &&<li><button onClick={handleLogout}>Выход</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
