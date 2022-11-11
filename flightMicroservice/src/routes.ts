import { Router } from "express";
import flightsRoutes from "./modules/routes";

const routes = Router();

routes.use('/flights', flightsRoutes);
export default routes;