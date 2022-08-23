import env from "@config/env";
import { EnumMethodRoute, IRoute } from "@interface/IRoute";
import notFoundUser from "@middlewares/user/notFound";
import validParamsUser from "@middlewares/user/validateParams";
import validateToken from "@middlewares/validateToken";
import requestCatch from "@utils/catchErrors";
import UserController from "../controller/user.controller";

const URL_BASE = `${env.initialRoute}/user`;
const clientController = new UserController();

const routes: IRoute[] = [
  {
    path: URL_BASE,
    method: EnumMethodRoute.POST,
    handler: [
      requestCatch(validParamsUser),
      requestCatch(clientController.store),
    ],
  },
  {
    path: `${URL_BASE}/all`,
    method: EnumMethodRoute.GET,
    handler: [requestCatch(clientController.search)],
  },
  {
    path: URL_BASE,
    method: EnumMethodRoute.GET,
    handler: [requestCatch(clientController.findOne)],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(notFoundUser),
      requestCatch(clientController.findById),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.PUT,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundUser),
      requestCatch(clientController.update),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.DELETE,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundUser),
      requestCatch(clientController.delete),
    ],
  },
];

export default routes;
