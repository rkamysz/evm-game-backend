import { Result } from "@soapjs/soap";
import { Player } from "../domain/player";
import { PlayerRepository } from "../domain/player.repository";
import { EthersSource } from "./ethers-source";

export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(private source: EthersSource) {}

  async addPlayer(player: Player): Promise<Result<boolean>> {
    throw new Error("Method not implemented.");
  }
  async listPlayer(): Promise<Result<Player[]>> {
    throw new Error("Method not implemented.");
  }
}
