import "reflect-metadata";

import { Container } from "inversify";
import { SoapExpress } from "@soapjs/soap-express";

import { Dependencies, Config, Router } from "./core";

export const bootstrap = async () => {
  const config = Config.create();
  const dependencies = new Dependencies(new Container(), config);
  const router = new Router("1");

  const { httpServer } = await SoapExpress.bootstrap(
    config,
    dependencies,
    router,
    {}
  );
};

bootstrap();
