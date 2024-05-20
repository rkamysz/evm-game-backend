import { Request, Response } from "express";
import { Result, RouteIO } from "@soapjs/soap";
import { Player } from "../../features";

type AddPlayerModel = {
  playerAddress: string;
  score: number;
};

export class AddPlayerRouteIO
  implements RouteIO<Player, AddPlayerModel, Request, Response>
{
  toResponse(response: Response, result: Result<AddPlayerModel>): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      response.status(200).send("Player added");
    }
  }

  fromRequest(request: Request<unknown, unknown, AddPlayerModel>): Player {
    const {
      body: { playerAddress, score },
    } = request;

    return new Player(playerAddress, score);
  }
}
