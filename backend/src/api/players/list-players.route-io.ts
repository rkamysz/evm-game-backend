import { Request, Response } from "express";
import { Result, RouteIO } from "@soapjs/soap";
import { Player } from "../../features";

type ListPlayersModel = {
  playerAddress: string;
  score: number;
};

export class ListPlayersRouteIO
  implements RouteIO<Player, unknown, Request, Response>
{
  toResponse(
    response: Response<ListPlayersModel[] | string>,
    result: Result<Player[]>
  ): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      const { content: players } = result;

      const body = players.map((player) => ({
        playerAddress: player.address,
        score: player.score,
      }));

      response.status(200).send(body);
    }
  }
}
