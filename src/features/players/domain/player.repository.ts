import { Result } from "@soapjs/soap";
import { Player } from "./player";

/**
 * @abstract
 * @class PlayerRepository
 * Abstract class representing a repository for managing players.
 */
export abstract class PlayerRepository {
  static Token = "PlayerRepository";

  /**
   * Adds a player to the repository.
   * @abstract
   * @param {Player} player - The player to add.
   * @returns {Promise<Result<boolean>>} A promise that resolves to the result of the operation.
   */
  abstract addPlayer(player: Player): Promise<Result<boolean>>;

  /**
   * Lists all players in the repository.
   * @abstract
   * @returns {Promise<Result<Player[]>>} A promise that resolves to the result of the operation.
   */
  abstract listPlayers(): Promise<Result<Player[]>>;
}
