import MetaMaskOnboarding from "@metamask/onboarding";

const isMetaMaskInstalled = function () {
  return (typeof ethereum != 'undefined' && ethereum && ethereum.isMetaMask);
}

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    return await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};

const onboard = function() {
  console.log('entered');
  const onboarding = new MetaMaskOnboarding();
  onboarding.startOnboarding();
}

export {
  isMetaMaskInstalled, onboard, onClickConnect
};