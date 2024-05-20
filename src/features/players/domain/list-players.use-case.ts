import { Result, UseCase } from "@soapjs/soap";
import { Player } from "./player";
import { inject, injectable } from "inversify";
import { PlayerRepository } from "./player.repository";

/**
 * @class ListPlayersUseCase
 * Implements the UseCase interface for listing players.
 * @implements {UseCase<Player[]>}
 */
@injectable()
export class ListPlayersUseCase implements UseCase<Player[]> {
  static Token = "ListPlayersUseCase";

  constructor(
    @inject(PlayerRepository.Token) private players: PlayerRepository
  ) {}

  /**
   * Executes the use case to list all players.
   * @returns {Promise<Result<Player[]>>} A promise that resolves to the result of the operation.
   */
  execute(): Promise<Result<Player[]>> {
    return this.players.listPlayers();
  }
}
