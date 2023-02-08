import { redirect } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Login() {
    const LoginData = getLoginData();
    if (LoginData) {
        return redirect('/dashboard');
    }
    return <div>Login</div>;
}

export default Login;
