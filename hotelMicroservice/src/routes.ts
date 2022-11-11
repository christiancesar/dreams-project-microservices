import { Router } from "express";
import hotelsRoutes from "./modules/routes";

const routes = Router();

routes.use('/hotels', hotelsRoutes);
export default routes;