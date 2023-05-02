import { Navigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';
import Button from './Utils/Button';
import { useState } from 'react';
import { getWebThreeData } from './WebThreeProvider';

function Vote() {
  const LoginData = getLoginData();

  if (!LoginData) {
    return <Navigate to='/login' />;
  }

  const { voteHandle } = getWebThreeData();
  const [voteInfo, setVoteInfo] = useState({
    tCid: '',
    cid: '',
  });

  function setData(e) {
    setVoteInfo({ ...voteInfo, [e.target.name]: e.target.value });
  }

  async function handleForm(e) {
    e.preventDefault();
    await voteHandle(voteInfo.tCid, voteInfo.cid);
    setVoteInfo({
      tCid: '',
      cid: '',
    });
  }

  return (
    <div className='vote'>
      <div className='wTitle'>Vote</div>
      <form>
        <div className='inputGroup'>
          <label htmlFor='tcid'>Team ID</label>
          <input
            type='text'
            name='tCid'
            value={voteInfo.tCid}
            onChange={(e) => {
              setData(e, 'tCid');
            }}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='cid'>CID</label>
          <input
            type='text'
            name='cid'
            value={voteInfo.cid}
            onChange={(e) => {
              setData(e, 'cid');
            }}
          />
        </div>
        <Button text='Submit' onClick={handleForm} />
      </form>
    </div>
  );
}

export default Vote;
