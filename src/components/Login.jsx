import { Navigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Login() {
    const LoginData = getLoginData();
    if (LoginData) {
        return <Navigate to='/dashboard' />;
    }
    return <div>Login</div>;
}

export default Login;
