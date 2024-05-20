import { Result } from "@soapjs/soap";
import { Player } from "./player";

export abstract class PlayerRepository {
  static Token = "PlayerRepository";

  abstract addPlayer(player: Player): Promise<Result<boolean>>;
  abstract listPlayer(): Promise<Result<Player[]>>;
}
