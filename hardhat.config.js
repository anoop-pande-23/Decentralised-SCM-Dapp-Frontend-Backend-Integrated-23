require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: process.env.API_URL || "https://volta-rpc.energyweb.org", // ✅ fallback URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 20000000000 // 20 gwei, you can adjust
    }
  }
};
