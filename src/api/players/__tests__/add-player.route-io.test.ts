import { Request, Response } from "express";
import { AddPlayerModel, AddPlayerRouteIO } from "../add-player.route-io";
import { HttpError, Result } from "@soapjs/soap";
import { Player } from "../../../features/players/domain/player";

describe("AddPlayerRouteIO", () => {
  let routeIO: AddPlayerRouteIO;

  beforeEach(() => {
    routeIO = new AddPlayerRouteIO();
  });

  describe("toResponse", () => {
    it('should send a 200 response with "Player added" if result is successful', () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const result = Result.withContent({
        playerAddress: "0x1234...",
        score: 100,
      });

      routeIO.toResponse(response, result);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith("Player added");
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

  describe("fromRequest", () => {
    it("should return a Player instance if request is valid", () => {
      const request = {
        body: {
          playerAddress: "0x1234567890abcdef1234567890abcdef12345678",
          score: 100,
        },
      } as Request<unknown, unknown, AddPlayerModel>;

      const player = routeIO.fromRequest(request);

      expect(player).toEqual(
        new Player("0x1234567890abcdef1234567890abcdef12345678", 100)
      );
    });

    it("should throw an HttpError if playerAddress is invalid", () => {
      const request = {
        body: { playerAddress: "invalid_address", score: 100 },
      } as Request<unknown, unknown, AddPlayerModel>;

      expect(() => routeIO.fromRequest(request)).toThrow(HttpError);
      expect(() => routeIO.fromRequest(request)).toThrow("Wrong ETH address");
    });
  });
});
