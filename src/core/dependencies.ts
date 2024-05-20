import * as Soap from "@soapjs/soap";
import { Container } from "inversify";
import {
  EthersSource,
  PlayerRepository,
  PlayerRepositoryImpl,
  PlayersController,
} from "../features";
import { ethers } from "ethers";
import { Config } from "./config";

export class Dependencies implements Soap.Dependencies<Container> {
  constructor(public readonly container: Container, private config: Config) {}

  async configure(): Promise<void> {
    const provider = new ethers.InfuraProvider(
      this.config.web3.network,
      this.config.web3.infuraProjectId
    );

    const source = new EthersSource(this.config.web3, provider, []);

    this.container
      .bind<PlayerRepository>(PlayerRepository.Token)
      .toConstantValue(new PlayerRepositoryImpl(source));

    this.container
      .bind<PlayersController>(PlayersController.Token)
      .to(PlayersController);
  }
}
