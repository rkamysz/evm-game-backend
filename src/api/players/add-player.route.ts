import { PostRoute } from "@soapjs/soap";
import { Container } from "inversify";
import { PlayersController } from "../../features";
import { AddPlayerRouteIO } from "./add-player.route-io";

export class AddPlayerRoute extends PostRoute {
  static create(container: Container) {
    const controller = container.get<PlayersController>(
      PlayersController.Token
    );
    const handler = controller.addPlayer.bind(controller);

    return new AddPlayerRoute("/players", handler, {
      io: new AddPlayerRouteIO(),
    });
  }
}
