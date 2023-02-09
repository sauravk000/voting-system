import { redirect } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Dashboard() {
    const LoginData = getLoginData();
    if (!LoginData) {
        return <Navigate to="/dashboard" />;
    }
    return <div>Dashboard</div>;
}

export default Dashboard;
