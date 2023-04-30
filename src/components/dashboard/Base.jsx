import axios from 'axios';
import { getLoginData } from '../LoginDataProvider';
import Window from '../Utils/Window';
import { getWebThreeData } from '../WebThreeProvider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Utils/Button';
import { getLoadFunc } from '../LoadingProvider';

function Base() {
  const { isCandidate, username } = getLoginData();
  const { connectWallet, connectedAccount, createCandidate } =
    getWebThreeData();
  const setLoading = getLoadFunc();
  const [tCidV, settcidV] = useState('');
  const cAddBtnHandler = async function (e) {
    try {
      createCandidate(tCidV, username);
      settcidV('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!connectedAccount ? (
        <Window
          title='Metamask'
          desc='Connect with metamask'
          buttonTitle='Connect'
          buttonHandler={connectWallet}
        />
      ) : (
        <>
          {isCandidate ? (
            <div className='window'>
              <div className='wTitle'>Candidate</div>
              <p className='wDesc'>Add yourself as candidate</p>
              <input
                className='wInput'
                type='text'
                value={tCidV}
                placeholder='Enter the Team ID'
                onChange={(e) => {
                  settcidV(e.target.value);
                }}
              ></input>
              <Link to={'#'}>
                <Button text='Add' onClick={cAddBtnHandler} />
              </Link>
            </div>
          ) : (
            <></>
          )}
          <Window
            title='Host View'
            desc='Control the candidates and the contract'
            buttonTitle='Go there'
            link='hostview'
          />
          <Window
            title='Vote Now'
            desc='Express your power as a simple vote.'
            buttonTitle='Vote'
            link='vote'
          />
          <Window
            title='Votes'
            desc='See the power that has been expressed as vote.'
            buttonTitle='See votes'
            link='displayVotes'
          />
        </>
      )}
    </>
  );
}

export default Base;
