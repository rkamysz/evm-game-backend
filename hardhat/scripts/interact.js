async function main() {
  const [deployer] = await ethers.getSigners();
  const leaderboardAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  const Leaderboard = await ethers.getContractFactory("Leaderboard");
  const leaderboard = await Leaderboard.attach(leaderboardAddress);

  console.log("Interacting with Leaderboard at:", leaderboard.address);

  const tx = await leaderboard.addPlayer(deployer.address, 100);
  await tx.wait();

  const players = await leaderboard.getPlayers();
  console.log("Players:", players);

  const playerCount = await leaderboard.getPlayerCount();
  console.log("Player count:", playerCount);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
