import QuoteRoutes from "@context/quote/infra/router/quote.routes";
import UserRoutes from "@context/user/infra/routes/user.routes";
import { IRoute } from "@interface/IRoute";

const routes: IRoute[] = [...UserRoutes, ...QuoteRoutes];

export default routes;
