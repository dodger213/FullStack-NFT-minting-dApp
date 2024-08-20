// require("@nomicfoundation/hardhat-waffle");
// requrei('dotenv').config();

// const { API_URL, PRIVATE_KEY } = process.env;

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     rinkeby: {
//       url: API_URL,
//       accounts: [PRIVATE_KEY]
//     }
//   }
// };


/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};