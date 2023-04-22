import { Navigate, Link } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';
import { getWebThreeData } from './WebThreeProvider';
import Button from './Utils/Button';
import { useState } from 'react';

function HostView() {
  const LoginData = getLoginData();
  const { connectedAccount, createTeam } = getWebThreeData();
  if (!LoginData) {
    return <Navigate to='/login' />;
  }
  if (!connectedAccount) {
    return <Navigate to='/dashboard' />;
  }
  const [teamName, setTeamName] = useState('');

  const handleClick = async function (e) {
    e.preventDefault();
    await createTeam(teamName, LoginData.token);
  };

  return (
    <div className='hostView'>
      <div className='hostTitle'>Host View</div>
      <div>
        <label>Create a team</label>
        <form>
          <div className='inputGroup'>
            <label htmlFor='username'>Team Name</label>
            <input
              type='text'
              name='teamName'
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            />
          </div>
          <Button text='Submit' onClick={handleClick} />
        </form>
      </div>
    </div>
  );
}

export default HostView;
