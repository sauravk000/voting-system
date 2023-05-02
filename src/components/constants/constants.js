export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votes",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "add",
        "type": "address"
      }
    ],
    "name": "CandidateEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "CandidateToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cidc",
        "type": "uint256"
      }
    ],
    "name": "TeamID",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "Token",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "add",
        "type": "address"
      }
    ],
    "name": "addVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "createTeam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      }
    ],
    "name": "getCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      }
    ],
    "name": "getCandidateAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      }
    ],
    "name": "getCandidateName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      }
    ],
    "name": "getCandidateVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      }
    ],
    "name": "getOwnerAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cidc",
        "type": "uint256"
      }
    ],
    "name": "getTeamToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "add",
        "type": "address"
      }
    ],
    "name": "removeVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tCid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cid",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const contractAddress="0xA6Db864760b5755353329D70d5D1946887C612C9";