require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition');
require('dotenv').config({ path: '../.env' });

console.log(':', process.env.PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: parseInt(process.env.CHAIN_ID) || 1337
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.PRIVATE_KEY],
      chainId: parseInt(process.env.CHAIN_ID) || 1337
    }
  }
};
