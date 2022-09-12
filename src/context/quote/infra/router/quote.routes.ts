import env from "@config/env";
import { EnumMethodRoute, IRoute } from "@interface/IRoute";
import requestCatch from "@utils/catchErrors";
import QuoteController from "../controller/quote.controller";

const URL_BASE = `${env.initialRoute}/quote`;
const quoteController = new QuoteController();

const routes: IRoute[] = [
  {
    path: URL_BASE,
    method: EnumMethodRoute.POST,
    handler: [requestCatch(quoteController.store)],
  },
  {
    path: `${URL_BASE}/all`,
    method: EnumMethodRoute.GET,
    handler: [requestCatch(quoteController.search)],
  },
  {
    path: URL_BASE,
    method: EnumMethodRoute.GET,
    handler: [requestCatch(quoteController.findOne)],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.GET,
    handler: [requestCatch(quoteController.findById)],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.PUT,
    handler: [requestCatch(quoteController.update)],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.DELETE,
    handler: [requestCatch(quoteController.delete)],
  },
];

export default routes;
