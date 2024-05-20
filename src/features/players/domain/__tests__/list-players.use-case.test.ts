import "reflect-metadata";
import { Result } from "@soapjs/soap";
import { ListPlayersUseCase } from "../list-players.use-case";
import { PlayerRepository } from "../player.repository";
import { Player } from "../player";

describe("ListPlayersUseCase", () => {
  let useCase: ListPlayersUseCase;
  let mockPlayerRepository: jest.Mocked<PlayerRepository>;

  beforeEach(() => {
    mockPlayerRepository = {
      addPlayer: jest.fn(),
      listPlayers: jest.fn(),
    } as unknown as jest.Mocked<PlayerRepository>;

    useCase = new ListPlayersUseCase(mockPlayerRepository);
  });

  describe("execute", () => {
    it("should call listPlayers on the repository and return players", async () => {
      const player = new Player(
        "0x1234567890abcdef1234567890abcdef12345678",
        100
      );
      const result = Result.withContent([player]);
      mockPlayerRepository.listPlayers.mockResolvedValue(result);

      const response = await useCase.execute();

      expect(mockPlayerRepository.listPlayers).toHaveBeenCalled();
      expect(response).toBe(result);
    });

    it("should return failure result if repository call fails", async () => {
      const result = Result.withFailure(new Error("Failed to list players"));
      mockPlayerRepository.listPlayers.mockResolvedValue(result);

      const response = await useCase.execute();

      expect(mockPlayerRepository.listPlayers).toHaveBeenCalled();
      expect(response.isFailure).toBe(true);
      expect(response.failure).toBe(result.failure);
    });
  });
});
