import Button from '../Utils/Button';
import { Link } from 'react-router-dom';
import { getLoginData } from '../LoginDataProvider';
import { getAddressData } from '../AddressDataProvider';

function DashboardNavBar() {
  const loginData = getLoginData();
  const addressData = getAddressData();
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
          <Button text={!addressData ? 'Not connected' : 'Connected'}></Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardNavBar;
