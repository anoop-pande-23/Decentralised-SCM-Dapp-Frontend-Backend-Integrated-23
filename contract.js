const ethers = require("ethers");
require("dotenv").config();
const { abi } = require("./artifacts/contracts/contractApi.sol/contractApi.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

module.exports = { contractInstance };

