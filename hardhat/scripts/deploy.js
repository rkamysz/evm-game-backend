const { ethers, network } = require('hardhat');

const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Leaderboard = await ethers.getContractFactory('Leaderboard');
  const leaderboard = await Leaderboard.deploy();

  console.log('Leaderboard contract deployed to:', leaderboard.address);

  return {
    abi: Leaderboard.interface.format(ethers.utils.FormatTypes.json),
    address: leaderboard.address
  };
  
}

module.exports = deploy;