import { GetRoute } from "@soapjs/soap";
import { Container } from "inversify";
import { PlayersController } from "../../features";
import { ListPlayersRouteIO } from "./list-players.route-io";

export class ListPlayersRoute extends GetRoute {
  static create(container: Container) {
    const controller = container.get<PlayersController>(
      PlayersController.Token
    );
    const handler = controller.listPlayers.bind(controller);

    return new ListPlayersRoute("/players", handler, {
      io: new ListPlayersRouteIO(),
    });
  }
}
