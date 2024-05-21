require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('dotenv').config({ path: '../.env' });

module.exports = {
  solidity: '0.8.0',
  networks: {
    hardhat: {
      chainId: parseInt(process.env.CHAIN_ID) || 1337
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.PRIVATE_KEY],
      chainId: parseInt(process.env.CHAIN_ID) || 1337
    },
    rinkeby: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
