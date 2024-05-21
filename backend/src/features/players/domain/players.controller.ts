import { Result } from "@soapjs/soap";
import { inject, injectable } from "inversify";
import { AddPlayerUseCase } from "./add-player.use-case";
import { ListPlayersUseCase } from "./list-players.use-case";
import { Player } from "./player";

/**
 * @class PlayersController
 * Controller for handling player-related operations.
 */
@injectable()
export class PlayersController {
  static Token = "PlayersController";

  /**
   * Creates an instance of PlayersController.
   * @param {AddPlayerUseCase} addPlayerUseCase - The use case for adding a player.
   * @param {ListPlayersUseCase} listPlayersUseCase - The use case for listing players.
   */
  constructor(
    @inject(AddPlayerUseCase.Token) private addPlayerUseCase: AddPlayerUseCase,
    @inject(ListPlayersUseCase.Token)
    private listPlayersUseCase: ListPlayersUseCase
  ) {}

  /**
   * Adds a player using the AddPlayerUseCase.
   * @param {Player} player - The player to add.
   * @returns {Promise<Result<any>>} A promise that resolves to the result of the operation.
   */
  public async addPlayer(player: Player): Promise<Result<any>> {
    return this.addPlayerUseCase.execute(player);
  }

  /**
   * Lists all players using the ListPlayersUseCase.
   * @returns {Promise<Result<Player[]>>} A promise that resolves to the result of the operation.
   */
  public async listPlayers(): Promise<Result<Player[]>> {
    return this.listPlayersUseCase.execute();
  }
}
