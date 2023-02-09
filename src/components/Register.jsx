import { Navigate, redirect } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Register() {
    const LoginData = getLoginData();
    console.log(LoginData);
    if (LoginData) {
        return <Navigate to='/dashboard' />;
    }
    return <div>Register</div>;
}

export default Register;
