import Auth from '../components/auth/authorization/Auth';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1 className='login-title'>Авторизация</h1>
                <Auth />
                <p style={{ marginTop: '10px' }}>Нет аккаунта? <Link style={{color: '#512689'}} to={'/register'}>Зарегистрироваться</Link></p>
            </div>
            <div className='test'>
                <p>Test</p>
                <p>email: eve.holt@reqres.in</p>
                <p>password: cityslicka</p>
            </div>

        </div>
    );
};

export default LoginPage;
