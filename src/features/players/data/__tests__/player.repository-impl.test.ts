import { LeaderboardContract, PlayerStruct } from "../../../../web3";
import { Mapper, Result } from "@soapjs/soap";
import { Player } from "../../domain/player";
import { PlayerRepositoryImpl } from "../player.repository-impl";

jest.mock("../../../../web3");

describe("PlayerRepositoryImpl", () => {
  let contract: any;
  let mapper: jest.Mocked<Mapper<Player>>;
  let repository: PlayerRepositoryImpl;

  beforeEach(() => {
    contract = {
      addPlayer: jest.fn(() => {
        wait: jest.fn();
      }),
      getPlayers: jest.fn(),
      players: [],
    };
    mapper = {
      toEntity: jest.fn(),
    };
    repository = new PlayerRepositoryImpl(contract, mapper);
  });

  describe("addPlayer", () => {
    it("should add a player and return success result", async () => {
      contract.addPlayer.mockResolvedValue({
        wait: jest.fn().mockResolvedValue(true),
      });

      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = await repository.addPlayer(player);

      expect(contract.addPlayer).toHaveBeenCalledWith(
        player.address,
        player.score
      );
      expect(result).toEqual(Result.withContent(true));
    });

    it("should return failure result if addPlayer fails", async () => {
      const error = new Error("Failed to add player");
      contract.addPlayer.mockRejectedValue(error);

      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = await repository.addPlayer(player);

      expect(result).toEqual(Result.withFailure(error));
    });
  });

  describe("listPlayers", () => {
    it("should list players and return success result", async () => {
      const playerStructs: PlayerStruct[] = [
        {
          playerAddress: "0x1234567890abcdef1234567890abcdef12345678",
          score: 100,
        },
        { playerAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdef", score: 200 },
      ];
      contract.getPlayers.mockResolvedValue(playerStructs);

      const players = playerStructs.map(
        (struct: PlayerStruct) => new Player(struct.playerAddress, struct.score)
      );
      mapper.toEntity.mockImplementation(
        (struct: PlayerStruct) => new Player(struct.playerAddress, struct.score)
      );

      const result = await repository.listPlayers();

      expect(contract.getPlayers).toHaveBeenCalled();
      expect(result).toEqual(Result.withContent(players));
    });

    it("should return failure result if getPlayers fails", async () => {
      const error = new Error("Failed to list players");
      contract.getPlayers.mockRejectedValue(error);

      const result = await repository.listPlayers();

      expect(result).toEqual(Result.withFailure(error));
    });
  });
});
