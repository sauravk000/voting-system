import { Navigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Dashboard() {
  const LoginData = getLoginData();
  if (!LoginData) {
    return <Navigate to='/login' />;
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
