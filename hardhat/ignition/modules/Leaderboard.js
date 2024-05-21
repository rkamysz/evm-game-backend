const fs = require('fs');
const path = require('path');
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('LeaderboardModule', (m) => {
  const leaderboard = m.contract('Leaderboard');

  return {
    leaderboard,
    build: async (deployer, contracts) => {
      const leaderboardInstance = contracts.leaderboard;

      const data = {
        Leaderboard: {
          address: leaderboardInstance.address,
          abi: JSON.parse(leaderboardInstance.interface.format('json'))
        }
      };

      const dataPath = path.join(__dirname, '../..', 'deployed_contracts.json');
      if (fs.existsSync(dataPath)) {
        const existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        Object.assign(existingData, data);
        fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));
      } else {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      }

      console.log("Leaderboard contract ABI and address saved to:", dataPath);
    }
  };
});
