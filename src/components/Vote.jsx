import { Navigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';

function Vote() {
  const LoginData = getLoginData();

  if (!LoginData) {
    return <Navigate to='/login' />;
  }
  return <div>Vote</div>;
}

export default Vote;
