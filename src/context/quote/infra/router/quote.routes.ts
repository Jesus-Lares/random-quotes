import env from "@config/env";
import { EnumMethodRoute, IRoute } from "@interface/IRoute";
import hasAuthorization from "@middlewares/quote/hasAuthorization";
import notFoundQuote from "@middlewares/quote/notFound";
import validParamsQuote from "@middlewares/quote/validateParams";
import validateApiKey from "@middlewares/validateApiKey";
import hasDailyQuote from "@middlewares/randomQuote/hasDailyQuote";
import validateToken from "@middlewares/validateToken";
import requestCatch from "@utils/catchErrors";
import QuoteController from "../controller/quote.controller";

const URL_BASE = `${env.initialRoute}/quote`;
const quoteController = new QuoteController();

const routes: IRoute[] = [
  {
    path: URL_BASE,
    method: EnumMethodRoute.POST,
    handler: [
      requestCatch(validateToken),
      requestCatch(validParamsQuote),
      requestCatch(quoteController.store),
    ],
  },
  {
    path: `${URL_BASE}/:apiKey/random`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateApiKey),
      requestCatch(hasDailyQuote),
      requestCatch(quoteController.getRandom),
    ],
  },
  {
    path: `${URL_BASE}/all`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(hasAuthorization),
      requestCatch(quoteController.search),
    ],
  },
  {
    path: URL_BASE,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(hasAuthorization),
      requestCatch(quoteController.findOne),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundQuote),
      requestCatch(hasAuthorization),
      requestCatch(quoteController.findById),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.PUT,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundQuote),
      requestCatch(hasAuthorization),
      requestCatch(quoteController.update),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.DELETE,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundQuote),
      requestCatch(hasAuthorization),
      requestCatch(quoteController.delete),
    ],
  },
];

export default routes;
