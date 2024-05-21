import ethers from "ethers";

/**
 * @type PlayerStruct
 * Represents a player in the leaderboard.
 */
export type PlayerStruct = {
  playerAddress: string;
  score: number;
};

/**
 * @interface LeaderboardContract
 * Represents the contract interface for interacting with the leaderboard on the blockchain.
 */
export interface LeaderboardContract {
  players: PlayerStruct[];
  addPlayer(address: string, score: number): Promise<any>;
  getPlayers(): PlayerStruct[];
}
