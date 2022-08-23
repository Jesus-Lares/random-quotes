import express, { Application } from "express";
import addPlugins from "@config/addPlugins";
import addRouter from "@router/index";

const app: Application = express();
addPlugins(app);
addRouter(app);

if (process.env.NODE_ENV !== "test") console.log("Connect with Database");

export default app;
