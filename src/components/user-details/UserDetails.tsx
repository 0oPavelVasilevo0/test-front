import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { User, fetchUsers, resetAvatar, setCurrentUser, updateAvatar } from '../../utils/usersSlice';
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

    const [newAvatar, setNewAvatar] = useState<string | null>(null);
    const [editor, setEditor] = useState(1);
    const [loadError, setLoadError] = useState<string | null>(null);

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

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 120 * 1024) { // 120KB = 120 * 1024 bytes
                setLoadError('Не более 120кб!');
                setEditor(1);
                return;
            } else {
                setLoadError(null);
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAvatar = () => {
        if (user && newAvatar) {
            dispatch(updateAvatar({ userId: user.id, newAvatar }));
            setNewAvatar(null);
            setEditor(1);
        }
    };

    // const handleCancelAvatar = () => {
    //     setNewAvatar(null);
    //     setEditor(1);
    // }

    const handleResetAvatar = () => {
        if (user) {
            dispatch(resetAvatar(user.id));
            setNewAvatar(null);
            setEditor(1);
        }
    };

    if (!user) {
        return <div className='user-error'>User not found</div>;
    }

    return (
        <div className='user-details'>
            <header className='details-header'>
                <div className='details-user'>
                    <div className='user-info'>
                        <div className='user-avatar'>
                            <img
                                style={{ borderRadius: '50%' }}
                                src={newAvatar || user.avatar}
                                height={'187px'}
                                width={'187px'}
                                alt={user.first_name}
                            />
                            <div className='editor'>
                                {editor === 1 ?
                                    <button className='btn-editor' onClick={() => {setEditor(2); setLoadError(null)}}>
                                        редакт.{loadError && <div className='editor-error'>{loadError}</div>}
                                    </button>
                                    :
                                    <>{!newAvatar && <button className='btn-editor' onClick={() => setEditor(1)}>закрыть</button>}</>
                                }
                                {editor === 2 &&
                                    <>
                                        {!newAvatar &&
                                            <label className="editor-file">
                                                загрузить
                                                {/* {loadError ? <div className='editor-file editor-error'>{loadError}</div> :
                                               'выберите файл'} */}
                                                <input type="file" onChange={handleAvatarChange} />
                                            </label>}
                                        {newAvatar &&
                                            <>
                                                <button className='btn-editor' onClick={handleSaveAvatar}>сохранить</button>
                                                {/* <button className='btn-editor' onClick={handleCancelAvatar}>cancel</button> */}
                                            </>
                                        }
                                        <button className='btn-editor re' onClick={handleResetAvatar}>сброс</button>
                                    </>
                                }
                            </div>
                            {/* {loadError && <div className='editor-error'>{loadError}</div>} */}
                        </div>
                        <h1 className='user-name'>
                            {user.first_name} {user.last_name}
                        </h1>
                    </div>
                </div>
            </header>
            <div className='description-container'>
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