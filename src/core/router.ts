import { ExpressRouter } from "@soapjs/soap-express";
import { Container } from "inversify";
import { AddPlayerRoute, ListPlayersRoute } from "../api";

export class Router extends ExpressRouter<Container> {
  //
  setupRoutes(): void {
    this.mount(AddPlayerRoute.create(this.container));
    this.mount(ListPlayersRoute.create(this.container));
  }
}
