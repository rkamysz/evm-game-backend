#!/bin/sh

# Start Hardhat node in the background
npx hardhat node &

# Wait a moment for Hardhat node to start
sleep 5

# Compile the contracts
npx hardhat compile

# Deploy contracts using yes for automatic confirmation
yes | npx hardhat ignition deploy ignition/modules/Leaderboard.js --network localhost

# Deploy compiled contracts to one single json file
npx hardhat run scripts/deploy.js --network localhost

# Start the Express.js server in the background
node ./scripts/server.js