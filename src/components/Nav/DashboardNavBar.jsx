import Button from '../Utils/Button';
import { Link } from 'react-router-dom';
import { getLoginData } from '../LoginDataProvider';
import { getWebThreeData } from '../WebThreeProvider';

function DashboardNavBar() {
  const loginData = getLoginData();
  const { connectedAccount } = getWebThreeData();
  if (!loginData) {
    console.log('Null');
  }

  return (
    <div className='nav'>
      <div className='brand'>
        <Link to='/'>VoSys</Link>
      </div>
      <div className='links'>
        <Link to='#'>
          <Button
            text={!connectedAccount ? 'Disconnected' : 'Connected'}
          ></Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardNavBar;
