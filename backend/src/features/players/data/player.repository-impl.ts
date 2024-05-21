import { Mapper, Result } from "@soapjs/soap";
import { Player } from "../domain/player";
import { PlayerRepository } from "../domain/player.repository";
import { LeaderboardContract } from "../../../web3";

/**
 * @class PlayerRepositoryImpl
 * Implements the PlayerRepository interface for interacting with the leaderboard contract.
 * @implements {PlayerRepository}
 */
export class PlayerRepositoryImpl implements PlayerRepository {
  /**
   * @constructor
   * @param {LeaderboardContract} contract - The contract instance for interacting with the blockchain.
   * @param {Mapper<Player>} mapper - The mapper for converting contract data to Player entities.
   */
  constructor(
    private contract: LeaderboardContract,
    private mapper: Mapper<Player>
  ) {}

  /**
   * Adds a player to the leaderboard.
   * @param {Player} player - The player to add.
   * @returns {Promise<Result<boolean>>} A promise that resolves to the result of the operation.
   */
  async addPlayer(player: Player): Promise<Result<boolean>> {
    try {
      const tx = await this.contract.addPlayer(player.address, player.score);
      await tx.wait();
      return Result.withContent(true);
    } catch (error) {
      return Result.withFailure(error);
    }
  }

  /**
   * Lists all players from the leaderboard.
   * @returns {Promise<Result<Player[]>>} A promise that resolves to the result of the operation.
   */
  async listPlayers(): Promise<Result<Player[]>> {
    try {
      const structs = await this.contract.getPlayers();
      return Result.withContent(
        structs.map((struct) => this.mapper.toEntity(struct))
      );
    } catch (error) {
      return Result.withFailure(error);
    }
  }
}
