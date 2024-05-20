import { Result, UseCase } from "@soapjs/soap";
import { Player } from "./player";
import { inject, injectable } from "inversify";
import { PlayerRepository } from "./player.repository";

/**
 * @class AddPlayerUseCase
 * Implements the UseCase interface for adding a player.
 * @implements {UseCase<boolean>}
 */
@injectable()
export class AddPlayerUseCase implements UseCase<boolean> {
  static Token = "AddPlayerUseCase";

  constructor(
    @inject(PlayerRepository.Token) private players: PlayerRepository
  ) {}

  /**
   * Executes the use case to add a player.
   * @param {Player} player - The player to add.
   * @returns {Promise<Result<boolean>>} A promise that resolves to the result of the operation.
   */
  execute(player: Player): Promise<Result<boolean>> {
    return this.players.addPlayer(player);
  }
}
