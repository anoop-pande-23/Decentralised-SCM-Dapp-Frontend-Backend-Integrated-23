// // // require('dotenv').config();
// // // require("@nomiclabs/hardhat-ethers");

// // // /**
// // // * @type import('hardhat/config').HardhatUserConfig
// // // */
// // // module.exports = {
// // //   solidity: "0.8.11",
// // //   defaultNetwork: "volta",
// // //   networks: {
// // //     hardhat: {},
// // //     volta: {
// // //       url: process.env.API_URL || "https://volta-rpc.energyweb.org", // ✅ fallback URL
// // //       accounts: [`0x${process.env.PRIVATE_KEY}`],
// // //       gasPrice: 20000000000 // 20 gwei, you can adjust
// // //     }
// // //   }
// // // };


// // require("dotenv").config();
// // require("@nomiclabs/hardhat-ethers");

// // /**
// //  * @type import('hardhat/config').HardhatUserConfig
// //  */
// // module.exports = {
// //   solidity: "0.8.11",
// //   defaultNetwork: "volta",
// //   networks: {
// //     hardhat: {},
// //     volta: {
// //   url: process.env.API_URL || "https://rpc.volta.energyweb.org",   // ⭐ use stable RPC
// //   chainId: 73799,
// //   accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
// //   gasPrice: 20000000000,
// // }

// //   }
// // };



// require("@nomiclabs/hardhat-ethers");

// module.exports = {
//   solidity: "0.8.11",
//   defaultNetwork: "localhost",
//   networks: {
//     hardhat: {
//       chainId: 31337,
//     },
//     localhost: {
//       url: "http://127.0.0.1:8545",
//       chainId: 31337,
//     }
//   }
// };

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  }
};
