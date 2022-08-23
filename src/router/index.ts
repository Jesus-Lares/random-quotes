import { Router, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "@config/swagger";
import env from "@config/env";
import routesV1 from "./v1/routes";

export default (router: Router): void => {
  const allRoutes = [...routesV1];
  allRoutes.forEach((route) => {
    const { method, path, handler } = route;
    router[method](path, handler);
  });

  const isInDevelopment = process.env.NODE_ENV === "development";
  if (isInDevelopment) {
    router.use(
      env.initialRoute,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSetup)
    );
  } else {
    router.use(env.initialRoute, (_: Request, res: Response) => {
      res.status(200).send("Template");
    });
  }
};
