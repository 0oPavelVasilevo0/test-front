import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../utils/authSlice';
import { RootState, AppDispatch } from '../../../store/store';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import './../auth.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state: RootState) => state.auth);

    const validateEmail = (email: string): boolean => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const viewPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Неправильный формат email');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('Пароли не совпадают');
            return;
        }
        setEmailError('');
        setPasswordError('');
        dispatch(register({ email, password }));
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className='login_window'>
            <form className='login_form' onSubmit={handleSubmit}>
                <div className='login_input'>
                    <label>Имя</label>
                    <input
                        type="text"
                        required
                        placeholder='Имя'
                    />
                </div>
                <div className='login_input'>
                    <label>Электронная почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder='example@mail.ru'
                        className={emailError ? 'error' : ''}
                    />
                    {emailError && <div className='error_message'>{emailError}</div>}
                </div>
                <div className='login_password'>
                    <label>Пароль</label>
                    <div className='password_container'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='*******'
                        />
                        <button type="button" className='password_btn' onClick={viewPassword}>
                            {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                        </button>
                    </div>
                </div>
                <div className='login_password'>
                    <label>Подтвердить пароль</label>
                    <div className='password_container'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            placeholder='*******'
                            className={passwordError ? 'error' : ''}
                        />
                        <button type="button" className='password_btn' onClick={viewPassword}>
                            {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                        </button>
                    </div>
                    {passwordError && <div className='error_message'>{passwordError}</div>}
                </div>
                <button className='btn' type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
                {error && <div style={{ color: '#FF6161', textAlign: 'center' }}>{error}</div>}
            </form>
        </div>
    );
};

export default Register;
