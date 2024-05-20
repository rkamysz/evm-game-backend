import "reflect-metadata";
import { Result } from "@soapjs/soap";
import { AddPlayerUseCase } from "../add-player.use-case";
import { PlayerRepository } from "../player.repository";
import { Player } from "../player";

describe("AddPlayerUseCase", () => {
  let useCase: AddPlayerUseCase;
  let mockPlayerRepository: jest.Mocked<PlayerRepository>;

  beforeEach(() => {
    mockPlayerRepository = {
      addPlayer: jest.fn(),
      listPlayers: jest.fn(),
    } as unknown as jest.Mocked<PlayerRepository>;

    useCase = new AddPlayerUseCase(mockPlayerRepository);
  });

  describe("execute", () => {
    it("should call addPlayer on the repository with the correct player", async () => {
      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = Result.withContent(true);
      mockPlayerRepository.addPlayer.mockResolvedValue(result);

      const response = await useCase.execute(player);

      expect(mockPlayerRepository.addPlayer).toHaveBeenCalledWith(player);
      expect(response).toBe(result);
    });

    it("should return failure result if repository call fails", async () => {
      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = Result.withFailure(new Error("Failed to add player"));
      mockPlayerRepository.addPlayer.mockResolvedValue(result);

      const response = await useCase.execute(player);

      expect(mockPlayerRepository.addPlayer).toHaveBeenCalledWith(player);
      expect(response.isFailure).toBe(true);
      expect(response.failure).toBe(result.failure);
    });
  });
});
