import { Navigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function HostView() {
  const LoginData = getLoginData();
  if (!LoginData) {
    return <Navigate to='/login' />;
  }
  return <div>HostView</div>;
}

export default HostView;
