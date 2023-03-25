import { Navigate, Outlet } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';
import DashboardNavBar from './Nav/DashboardNavBar';

function Dashboard() {
  const LoginData = getLoginData();

  if (!LoginData) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='dashContainer'>
      <DashboardNavBar></DashboardNavBar>
      <div className='dashboard'>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;
