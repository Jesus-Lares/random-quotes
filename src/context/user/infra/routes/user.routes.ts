import env from "@config/env";
import { EnumMethodRoute, IRoute } from "@interface/IRoute";
import emailExist from "@middlewares/user/emailExist";
import hasAuthorization from "@middlewares/user/hasAuthorization";
import notFoundUser from "@middlewares/user/notFound";
import validParamsUser from "@middlewares/user/validateParams";
import validParamsInLogin from "@middlewares/user/validateParamsInLogin";
import validateToken from "@middlewares/validateToken";
import requestCatch from "@utils/catchErrors";
import UserController from "../controller/user.controller";

const URL_BASE = `${env.initialRoute}/user`;
const clientController = new UserController();

const routes: IRoute[] = [
  {
    path: `${URL_BASE}/login`,
    method: EnumMethodRoute.POST,
    handler: [
      requestCatch(validParamsUser),
      requestCatch(emailExist),
      requestCatch(clientController.store),
    ],
  },
  {
    path: `${URL_BASE}/login`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validParamsInLogin),
      requestCatch(clientController.signIn),
    ],
  },
  {
    path: `${URL_BASE}/all`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(hasAuthorization),
      requestCatch(clientController.search),
    ],
  },
  {
    path: URL_BASE,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(hasAuthorization),
      requestCatch(clientController.findOne),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.GET,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundUser),
      requestCatch(hasAuthorization),
      requestCatch(clientController.findById),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.PUT,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundUser),
      requestCatch(hasAuthorization),
      requestCatch(clientController.update),
    ],
  },
  {
    path: `${URL_BASE}/:id`,
    method: EnumMethodRoute.DELETE,
    handler: [
      requestCatch(validateToken),
      requestCatch(notFoundUser),
      requestCatch(hasAuthorization),
      requestCatch(clientController.delete),
    ],
  },
];

export default routes;
