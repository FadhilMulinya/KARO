// src/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
  // Modern dapp browsers...
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((error) => {
      console.error("User denied account access");
    });
} else if (window.web3) {
  // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Non-dapp browsers...
  console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3;
