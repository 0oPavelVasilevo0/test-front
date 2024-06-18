import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { User, fetchUsers, setCurrentUser } from '../../utils/usersSlice';
import LogoutButton from './../logout-button/LogoutButton';
import { FaAngleLeft } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import './user-details.css'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) =>
        state.users.users.find((user: User) => user.id === parseInt(id!))
    );
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers({ page: 1, token }));
        }
        if (user) {
            dispatch(setCurrentUser(user));
        }
        if (!token) {
            navigate('/login');
        }
    }, [token, user, dispatch, navigate]);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className='user-details'>
            <div className='details-nav'>
                <div className='details-nav-btn'>
                    <Link to={"/"}>
                        <button className='nav-btn'>
                            <span className='btn-icon'><FaAngleLeft /></span>
                            <span className='btn-not-text'>назад</span>
                        </button>
                    </Link>
                    <LogoutButton />
                </div>
                <div className='details-user'>
                    <div className='user-info'>
                        <img
                            style={{ borderRadius: '50%' }}
                            src={user.avatar}
                            height={'187px'}
                            width={'187px'}
                            alt={user.first_name}
                        />
                        <h1 className='user-name'>
                            {user.first_name} {user.last_name}
                        </h1>
                    </div>
                </div>

            </div>
            <div className='description-container'>
                {/* <img src={user.avatar} alt={user.first_name} />
                <h2>{user.first_name} {user.last_name}</h2> */}
                <div className='user-description'>
                    <p>Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.</p>
                    <p>В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".</p>
                    <p>Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.</p>
                </div>
                <div className='user-email'>
                    <AiOutlineMail style={{ fontSize: '24px', color: '#512689' }} />
                    <p>{user.email}</p>
                </div>

            </div>
        </div>
    );
};

export default UserDetail;




