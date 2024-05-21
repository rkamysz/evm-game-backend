import * as Soap from "@soapjs/soap";
import { Container } from "inversify";
import {
  AddPlayerUseCase,
  ListPlayersUseCase,
  PlayerEthersMapper,
  PlayerRepository,
  PlayerRepositoryImpl,
  PlayersController,
} from "../features";
import { Config } from "./config";
import { LeaderboardContract, ContractProvider } from "../web3";

/**
 * @class Dependencies
 * Implements the Soap.Dependencies interface for configuring dependencies in the application.
 * @implements {Soap.Dependencies<Container>}
 */
export class Dependencies implements Soap.Dependencies<Container> {
  /**
   * Creates an instance of Dependencies.
   * @param {Container} container - The inversion of control (IoC) container for managing dependencies.
   * @param {Config} config - The configuration required to initialize the contract and other dependencies.
   */
  constructor(public readonly container: Container, private config: Config) {}

  /**
   * Configures the dependencies by initializing the contract and binding implementations to interfaces.
   * @returns {Promise<void>} A promise that resolves when the configuration is complete.
   */
  async configure(): Promise<void> {
    const contractProvider = new ContractProvider<LeaderboardContract>(
      this.config
    );
    const contract = await contractProvider.fetch();
    this.container
      .bind<PlayerRepository>(PlayerRepository.Token)
      .toConstantValue(
        new PlayerRepositoryImpl(contract, new PlayerEthersMapper())
      );

    this.container
      .bind<AddPlayerUseCase>(AddPlayerUseCase.Token)
      .to(AddPlayerUseCase);
    this.container
      .bind<ListPlayersUseCase>(ListPlayersUseCase.Token)
      .to(ListPlayersUseCase);

    this.container
      .bind<PlayersController>(PlayersController.Token)
      .to(PlayersController);
  }
}
