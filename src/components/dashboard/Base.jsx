import Window from '../Utils/Window';
import { getAddressData, setAddressData } from '../AddressDataProvider';
import {
  onClickConnect,
  onboard,
  isMetaMaskInstalled,
} from '../../tools/metamaskCon';

function Base() {
  const addressDt = getAddressData();
  const setAdt = setAddressData();
  async function bHandler(e) {
    if (!isMetaMaskInstalled()) {
      console.log('Metamask is not installed');
      onboard();
    } else {
      let ad = (await onClickConnect())[0];
      if (addressDt != ad) {
        setAdt(ad);
      }
    }
  }
  return (
    <>
      {!addressDt ? (
        <Window
          title='Metamask'
          desc='Connect with metamask'
          buttonTitle='Connect'
          buttonHandler={bHandler}
        />
      ) : (
        <>
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
