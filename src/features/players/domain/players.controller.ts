import { Result } from "@soapjs/soap";
import { injectable } from "inversify";

@injectable()
export class PlayersController {
  static Token = "PlayersController";

  public async addPlayer(): Promise<Result<any>> {
    return Result.withoutContent();
  }

  public async listPlayers(): Promise<Result<any[]>> {
    return Result.withoutContent();
  }
}
