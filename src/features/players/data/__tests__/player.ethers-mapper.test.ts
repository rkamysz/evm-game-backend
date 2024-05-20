import { PlayerStruct } from "../../../../web3/contract.types";
import { Player } from "../../domain/player";
import { PlayerEthersMapper } from "../player.ethers-mapper";

describe("PlayerEethersMapper", () => {
  let mapper: PlayerEthersMapper;

  beforeEach(() => {
    mapper = new PlayerEthersMapper();
  });

  describe("toEntity", () => {
    it("should convert a PlayerStruct to a Player entity", () => {
      const playerStruct: PlayerStruct = {
        playerAddress: "0x1234567890abcdef1234567890abcdef12345678",
        score: 100,
      };

      const player = mapper.toEntity(playerStruct);

      expect(player).toBeInstanceOf(Player);
      expect(player.address).toBe(playerStruct.playerAddress);
      expect(player.score).toBe(playerStruct.score);
    });
  });
});
