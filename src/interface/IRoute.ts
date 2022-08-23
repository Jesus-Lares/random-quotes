import { RequestHandler } from "express";

export enum EnumMethodRoute {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface IRoute {
  path: string
  method: EnumMethodRoute
  handler: RequestHandler[]
}
