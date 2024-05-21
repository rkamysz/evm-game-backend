import "reflect-metadata";

import { Container } from "inversify";
import { Response } from "express";
import { SoapExpress } from "@soapjs/soap-express";

import { Dependencies, Config, Router } from "./core";
import { HttpError } from "@soapjs/soap";

export const bootstrap = async () => {
  const config = Config.create("../.env");
  const dependencies = new Dependencies(new Container(), config);
  const router = new Router("1");

  const { httpServer } = await SoapExpress.bootstrap(
    config,
    dependencies,
    router,
    {
      errorHandler: (err: Error) => {
        console.log(err);
      },
      httpErrorHandler: (err: HttpError, req, res: Response, next) => {
        console.log(err);
        res.status(err.status || 500).send(err.message);
      },
    }
  );
};

bootstrap();
