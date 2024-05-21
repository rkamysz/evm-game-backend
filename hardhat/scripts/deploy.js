const { ethers, network } = require('hardhat');
const fs = require('fs');
const path = require('path');

const deploy = async (contractName) => {
  const contractLC = contractName.toLowerCase();
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();

  await contract.deployed();

  const abiPath = path.join(__dirname, `../artifacts/contracts/${contractLC}.sol/${contractName}.json`);
  const abiFile = fs.readFileSync(abiPath, 'utf8');
  const abi = JSON.parse(abiFile).abi;

  console.log(`${contractName} contract deployed to:`, contract.address);

  return {
    abi,
    address: contract.address
  };
  
}

module.exports = deploy;