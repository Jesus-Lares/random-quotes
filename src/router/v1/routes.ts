import UserRoutes from "@context/user/infra/routes/user.routes";
import { IRoute } from "@interface/IRoute";

const routes: IRoute[] = [...UserRoutes];

export default routes;
