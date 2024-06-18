import React from 'react';
import Register from '../components/register/Register';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1 className='login-title'>Регистрация</h1>
                <Register />
                <p style={{ marginTop: '10px' }}>Есть аккаунт? <Link to={'/login'}>Войти</Link></p>
            </div>
            <div className='test'>
                <p>Test</p>
                <p>email: eve.holt@reqres.in</p>
                <p>password: pistol</p>
            </div>
        </div>
    );
};

export default RegisterPage;
