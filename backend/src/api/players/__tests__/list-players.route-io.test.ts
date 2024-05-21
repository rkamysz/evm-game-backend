import { Request, Response } from "express";
import { ListPlayersRouteIO } from "../list-players.route-io";
import { Player } from "../../../features/players/domain/player";
import { Result } from "@soapjs/soap";

describe("ListPlayersRouteIO", () => {
  let routeIO: ListPlayersRouteIO;

  beforeEach(() => {
    routeIO = new ListPlayersRouteIO();
  });

  describe("toResponse", () => {
    it("should send a 200 response with list of players if result is successful", () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const players = [
        new Player("0x1234567890abcdef1234567890abcdef12345678", 100),
        new Player("0xabcdefabcdefabcdefabcdefabcdefabcdef", 200),
      ];

      const result = Result.withContent(players);

      routeIO.toResponse(response, result);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith([
        {
          playerAddress: "0x1234567890abcdef1234567890abcdef12345678",
          score: 100,
        },
        { playerAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdef", score: 200 },
      ]);
    });

    it("should send a 500 response with error message if result is failure", () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = Result.withFailure(new Error("Something went wrong"));

      routeIO.toResponse(response, result);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith("Something went wrong");
    });
  });
});
