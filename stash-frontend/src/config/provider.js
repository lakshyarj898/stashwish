import { ethers } from "ethers";

export const getReadProvider = () => {
  // If MetaMask is installed and connected, use it. 
  // Otherwise, fallback to your local Hardhat node directly.
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }
};