import { Navigate, Link } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';
import { getWebThreeData } from './WebThreeProvider';
import Button from './Utils/Button';
import { useState } from 'react';

function HostView() {
  const LoginData = getLoginData();
  const { connectedAccount, createTeam, addVoter, removeVoter } =
    getWebThreeData();
  if (!LoginData) {
    return <Navigate to='/login' />;
  }
  if (!connectedAccount) {
    return <Navigate to='/dashboard' />;
  }
  const [teamName, setTeamName] = useState('');
  const [vpa, setVPA] = useState({
    tCid: '',
    vpa: '',
  });
  const [vpa2, setVPA2] = useState({
    tCid2: '',
    vpa2: '',
  });

  const handleClick = async function (e) {
    e.preventDefault();
    await createTeam(teamName, LoginData.token);
  };

  const handleData = function (e) {
    setVPA({ ...vpa, [e.target.name]: e.target.value });
  };
  const handleData2 = function (e) {
    setVPA2({ ...vpa2, [e.target.name]: e.target.value });
  };
  const handleClick1 = async function (e) {
    e.preventDefault();
    await addVoter(vpa.tCid, vpa.vpa);
    setVPA({
      tCid: '',
      vpa: '',
    });
  };

  const handleClick2 = async function (e) {
    e.preventDefault();
    await removeVoter(vpa2.tCid, vpa2.vpa2);
    setVPA2({
      tCid2: '',
      vpa2: '',
    });
  };

  return (
    <div className='hostView'>
      <div className='window'>
        <label>Create a team</label>
        <form>
          <div className='inputGroup'>
            <label htmlFor='teamName'>Team Name</label>
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
      <div className='window'>
        <label>Add a voter</label>
        <form>
          <div className='inputGroup'>
            <label htmlFor='tCid'>Team ID</label>
            <input
              type='text'
              name='tCid'
              value={vpa.tCid}
              onChange={handleData}
            />
          </div>
          <div className='inputGroup'>
            <label htmlFor='vpa'>Voter Public Address</label>
            <input
              type='text'
              name='vpa'
              value={vpa.vpa}
              onChange={handleData}
            />
          </div>
          <Button text='Submit' onClick={handleClick1} />
        </form>
      </div>
      <div className='window'>
        <label>Remove a voter</label>
        <form>
          <div className='inputGroup'>
            <label htmlFor='tCid2'>Team ID</label>
            <input
              type='text'
              name='tCid2'
              value={vpa2.tCid2}
              onChange={handleData2}
            />
          </div>
          <div className='inputGroup'>
            <label htmlFor='vpa2'>Voter Public Address</label>
            <input
              type='text'
              name='vpa2'
              value={vpa2.vpa2}
              onChange={handleData2}
            />
          </div>
          <Button text='Submit' onClick={handleClick2} />
        </form>
      </div>
    </div>
  );
}

export default HostView;
