import axios from 'axios';
import { getLoginData } from '../LoginDataProvider';
import Window from '../Utils/Window';
import { getWebThreeData } from '../WebThreeProvider';

function Base() {
  const { isCandidate, username, token } = getLoginData();
  const { connectWallet, connectedAccount, createCandidate } =
    getWebThreeData();
  const cAddBtnHandler = async function (e) {
    try {
      // const tx = await createCandidate(tCid, username);

      const ob = { name: username, address: connectedAccount, cid: '234' };
      let resp = await axios.post('http://localhost:5120/candidate/', ob);
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
            <Window
              title='Candidate'
              desc='Add yourself as candidate'
              buttonTitle='Add'
              buttonHandler={cAddBtnHandler}
            />
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
        </>
      )}
    </>
  );
}

export default Base;
