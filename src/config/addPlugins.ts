import express, { Application } from "express";
import path from "path";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

export default (app: Application): void => {
  app.use(express.json());
  app.use(compression());
  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(morgan("dev", { skip: () => process.env.NODE_ENV === "test" }));
  app.use(express.static(path.join(__dirname, "../../public")));
};
