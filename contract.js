const ethers = require("ethers");
require("dotenv").config();
const { abi } = require("./artifacts/contracts/contractApi.sol/contractApi.json");

// Provider (Local Hardhat node)
const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);

// Wallet (first Hardhat account)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract instance
const contractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

module.exports = { contractInstance };
