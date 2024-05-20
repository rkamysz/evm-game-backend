import { ExpressRouter } from "@soapjs/soap-express";
import { Container } from "inversify";
import { AddPlayerRoute, ListPlayersRoute } from "../api";

/**
 * @class Router
 * Extends the ExpressRouter class to set up application routes.
 * @extends {ExpressRouter<Container>}
 */
export class Router extends ExpressRouter<Container> {
  /**
   * Sets up the application routes by mounting specific route handlers.
   * @returns {void}
   */
  setupRoutes(): void {
    this.mount(AddPlayerRoute.create(this.container));
    this.mount(ListPlayersRoute.create(this.container));
  }
}
