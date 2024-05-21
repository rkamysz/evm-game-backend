import "reflect-metadata";
import { Result } from "@soapjs/soap";
import { jest } from "@jest/globals";
import { AddPlayerUseCase } from "../add-player.use-case";
import { ListPlayersUseCase } from "../list-players.use-case";
import { PlayersController } from "../players.controller";
import { Player } from "../player";

describe("PlayersController", () => {
  let addPlayerUseCase: jest.Mocked<AddPlayerUseCase>;
  let listPlayersUseCase: jest.Mocked<ListPlayersUseCase>;
  let controller: PlayersController;

  beforeEach(() => {
    addPlayerUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<AddPlayerUseCase>;

    listPlayersUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ListPlayersUseCase>;

    controller = new PlayersController(addPlayerUseCase, listPlayersUseCase);
  });

  describe("addPlayer", () => {
    it("should call execute on AddPlayerUseCase with the correct player", async () => {
      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = Result.withContent(true);
      addPlayerUseCase.execute.mockResolvedValue(result);

      const response = await controller.addPlayer(player);

      expect(addPlayerUseCase.execute).toHaveBeenCalledWith(player);
      expect(response).toBe(result);
    });

    it("should return failure result if AddPlayerUseCase fails", async () => {
      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const error = new Error("Failed to add player");
      addPlayerUseCase.execute.mockRejectedValueOnce(error);

      try {
        await controller.addPlayer(player);
      } catch (e) {
        expect(addPlayerUseCase.execute).toHaveBeenCalledWith(player);
        expect(e).toBe(error);
      }
    });
  });

  describe("listPlayers", () => {
    it("should call execute on ListPlayersUseCase and return list of players", async () => {
      const players = [
        new Player("0x1234567890abcdef1234567890abcdef12345678", 100),
        new Player("0xabcdefabcdefabcdefabcdefabcdefabcdef", 200),
      ];
      const result = Result.withContent(players);
      listPlayersUseCase.execute.mockResolvedValue(result);

      const response = await controller.listPlayers();

      expect(listPlayersUseCase.execute).toHaveBeenCalled();
      expect(response).toBe(result);
    });

    it("should return failure result if ListPlayersUseCase fails", async () => {
      const error = new Error("Failed to list players");
      listPlayersUseCase.execute.mockRejectedValueOnce(error);

      try {
        await controller.listPlayers();
      } catch (e) {
        expect(listPlayersUseCase.execute).toHaveBeenCalled();
        expect(e).toBe(error);
      }
    });
  });
});
