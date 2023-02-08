import { redirect } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Dashboard() {
    const LoginData = getLoginData();
    if (!LoginData) {
        redirect('/login');
    }
    return <div>Dashboard</div>;
}

export default Dashboard;
