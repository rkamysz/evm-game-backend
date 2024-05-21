import { Mapper } from "@soapjs/soap";
import { PlayerStruct } from "../../../web3";
import { Player } from "../domain/player";

/**
 * @class PlayerEthersMapper
 * Implements the Mapper interface for converting PlayerStruct to Player.
 * @implements {Mapper<Player, PlayerStruct>}
 */
export class PlayerEthersMapper implements Mapper<Player, PlayerStruct> {
  /**
   * Converts a PlayerStruct to a Player entity.
   * @param {PlayerStruct} model - The player data structure from the contract.
   * @returns {Player} The mapped Player entity.
   */
  toEntity(model: PlayerStruct): Player {
    return new Player(model.playerAddress, model.score);
  }
}
