const WebSocket = require('ws');
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Leaderboard = await ethers.getContractFactory('Leaderboard');
  const leaderboard = await Leaderboard.deploy();

  console.log('Leaderboard contract deployed to:', leaderboard.address);

  const contractData = {
    abi: Leaderboard.interface.format(ethers.utils.FormatTypes.json),
    address: leaderboard.address
  };

  const ws = new WebSocket('ws://backend:3000');

  ws.on('open', function open() {
    ws.send(JSON.stringify(contractData));
  });

  ws.on('close', function close() {
    console.log('Disconnected from backend');
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
