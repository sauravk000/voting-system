import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Onboarding from '@metamask/onboarding';
import axios from 'axios';
import LoadinScreen from './Utils/LoadingScreen';
import { getLoginData } from './LoginDataProvider';
import LoadingScreen from './Utils/LoadingScreen';

const WebThreeContext = createContext();

export const getWebThreeData = function () {
  return useContext(WebThreeContext);
};

export default function WebThreeProvider({ children }) {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const loginData = getLoginData();

  let token;
  if (loginData) token = loginData.token;
  const isWalletConnected = async function () {
    try {
      if (!ethereum) console.log('Install metamask first');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        if (token) await initEvents();
      } else {
        console.log('No accounts found');
      }
    } catch (err) {
      console.log(err);
      throw new Error('No ethereum object!');
    }
  };

  useEffect(() => {
    isWalletConnected();
  }, []);

  let ethereum;
  if (typeof window.ethereum != 'undefined') ethereum = window.ethereum;

  const initEvents = async function () {
    const contract = await getEthereumContract(token);
    contract.on('TeamID', async (tx, ob) => {
      console.log(tx);
      console.log(ob);
      await contract.getTeamToken(ob.log.data);
    });
    contract.on('Token', async (tx, ob) => {
      console.log(ob);
      loading(false);
    });
  };

  const getEthereumContract = async function () {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const { contractAddress, abi } = (await getContractDetails()).data;
      const candidateHandlerContract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      return candidateHandlerContract;
    } catch (err) {
      console.log(err);
    }
  };

  const getContractDetails = async function () {
    try {
      const cdetails = await axios.get(
        'http://localhost:5120/vote/getContractAddress',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return cdetails;
    } catch (err) {
      console.log(err);
    }
  };

  const createTeam = async function (teamName) {
    try {
      setLoading(true);
      const contract = await getEthereumContract(token);
      await contract.createTeam(teamName);
    } catch {
      setLoading(false);
    }
  };

  const createCandidate = async function (tCid, name) {
    const contract = await getEthereumContract(token);
    const res = await contract.addCandidate(tCid, name);
    console.log(res);
  };

  const connectWallet = async function () {
    try {
      if (!ethereum) {
        const onboarding = new Onboarding();
        onboarding.startOnboarding();
      } else {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setConnectedAccount(accounts[0]);
      }
    } catch (err) {
      console.log(err);
      throw new Error('No ethereum object');
    }
  };
  return (
    <WebThreeContext.Provider
      value={{ connectWallet, connectedAccount, createTeam, createCandidate }}
    >
      {children}
      <LoadingScreen isLoading={loading}></LoadingScreen>
    </WebThreeContext.Provider>
  );
}
