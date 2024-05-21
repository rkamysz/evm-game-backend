const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Leaderboard = await ethers.getContractFactory("Leaderboard");
  const leaderboard = await Leaderboard.deploy();
  await leaderboard.deployed();
  console.log("Leaderboard deployed to:", leaderboard.address);

  const data = {
    Leaderboard: {
      address: leaderboard.address,
      abi: JSON.parse(leaderboard.interface.format('json'))
    }
  };

  const dataPath = path.join(__dirname, '..', 'deployed_contracts.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  console.log("Contracts ABI and addresses saved to:", dataPath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
