import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Onboarding from '@metamask/onboarding';
import axios from 'axios';
import { getLoginData } from './LoginDataProvider';
import { getLoadFunc } from './LoadingProvider';
import { setAlert } from './AlertProvider';
import { contractAddress, abi } from './constants/constants.js';

const WebThreeContext = createContext();

export const getWebThreeData = function () {
  return useContext(WebThreeContext);
};

export default function WebThreeProvider({ children }) {
  const [connectedAccount, setConnectedAccount] = useState('');
  const setLoading = getLoadFunc();
  const loginData = getLoginData();
  const setAlertInfo = setAlert();

  let token;
  if (loginData) token = loginData.token;
  const isWalletConnected = async function () {
    try {
      if (!ethereum) console.log('Install metamask first');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    } catch (err) {
      throw new Error('No ethereum object!');
    }
  };

  useEffect(() => {
    isWalletConnected();
  }, []);

  let ethereum;
  if (typeof window.ethereum != 'undefined') ethereum = window.ethereum;

  const getEthereumContract = async function () {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const { contractAddress, abi } = getContractDetails();
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

  const voteHandle = async function (tCid, cid) {
    setLoading(true);
    const contract = await getEthereumContract();
    try {
      const tx = await contract.vote(tCid, cid);
      const rpt = await tx.wait(5);
      setLoading(false);
      setAlertInfo({
        title: 'Success',
        description: `Your vote has been successfully done. Your transaction hash: ${tx.hash}`,
        type: 'success',
        enabled: true,
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setAlertInfo({
        title: 'Error',
        description:
          'Some error occured. Maybe you have tried to vote again or the entered details are invalid.',
        type: 'error',
        enabled: true,
      });
    }
  };

  const getVoteAndName = async function (tCid, cid) {
    const contract = await getEthereumContract();
    try {
      const name = await contract.getCandidateName(tCid, cid);
      const votes = Number(await contract.getCandidateVotes(tCid, cid));
      return { name, votes };
    } catch (err) {
      console.log(err);
    }
  };

  const getContractDetails = function () {
    try {
      return { contractAddress, abi };
    } catch (err) {
      console.log(err);
    }
  };

  const createTeam = async (teamName) => {
    try {
      setLoading(true);
      const contract = await getEthereumContract();
      contract.on('TeamID', async (tx, ob) => {
        const cid = ob.log.data;
        contract.removeAllListeners();
        let resp = await axios.post(
          'https://voting-system-backend.onrender.com/team/create',
          {
            name: teamName,
            tCid: cid,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        setLoading(false);
        setAlertInfo({
          title: 'Success',
          description: `Team has been made successfully. Your team cid: ${cid}.`,
          type: 'success',
          enabled: true,
        });
      });
      await contract.createTeam(teamName);
    } catch {
      setAlertInfo({
        title: 'Error',
        description: 'Some error occured.',
        type: 'error',
        enabled: true,
      });
      setLoading(false);
    }
  };

  const createCandidate = async function (tCid, name) {
    setLoading(true);
    const contract = await getEthereumContract();
    try {
      contract.on('CandidateToken', async (tx, ob) => {
        let resp = await axios.post(
          'https://voting-system-backend.onrender.com/team/addCandidate',
          {
            tCid: tCid,
            cid: ob.log.data,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        setLoading(false);
        setAlertInfo({
          title: 'Success',
          description: `Your account has ben added. Your cid: ${ob.log.data}`,
          type: 'success',
          enabled: true,
        });
        contract.removeAllListeners();
      });
      await contract.addCandidate(tCid, name);
    } catch (err) {
      setLoading(false);
      contract.removeAllListeners();
      console.log(err);
    }
  };

  const addVoter = async function (tCid, voterAdd) {
    setLoading(true);
    const contract = await getEthereumContract();
    try {
      const transaction = await contract.addVoter(tCid, voterAdd);
      const receipt = await transaction.wait(5);
      setLoading(false);
      setAlertInfo({
        title: 'Success',
        description: `Voter address has ben successfully added.`,
        type: 'success',
        enabled: true,
      });
    } catch (err) {
      setLoading(false);
      setAlertInfo({
        title: 'Error',
        description: `Some error occured.`,
        type: 'error',
        enabled: true,
      });
      console.log(err);
    }
  };

  const removeVoter = async function (tCid, voterAdd) {
    setLoading(true);
    const contract = await getEthereumContract();
    try {
      await contract.removeVoter(tCid, voterAdd);
      setLoading(false);
      setAlertInfo({
        title: 'Success',
        description: `Voter address has ben successfully removed.`,
        type: 'success',
        enabled: true,
      });
    } catch (err) {
      setLoading(false);
      setAlertInfo({
        title: 'Error',
        description: `Some error occured.`,
        type: 'error',
        enabled: true,
      });
      console.log(err);
    }
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
      value={{
        connectWallet,
        connectedAccount,
        createTeam,
        createCandidate,
        voteHandle,
        getVoteAndName,
        addVoter,
        removeVoter,
      }}
    >
      {children}
    </WebThreeContext.Provider>
  );
}
