import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "flair", "type": "string" },
      { "internalType": "uint256", "name": "targetAmount", "type": "uint256" }
    ],
    "name": "addWishlistItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "stakeETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getWishlist",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "flair", "type": "string" },
          { "internalType": "uint256", "name": "targetAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "savedAmount", "type": "uint256" },
          { "internalType": "bool", "name": "unlocked", "type": "bool" }
        ],
        "internalType": "tuple[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];