import { Router } from "express";
import PackageOffersController from "../controllers/PackageOffersController";

const packageOffersRouter = Router();
const packageOffersController = new PackageOffersController();

packageOffersRouter.use('/', packageOffersController.index)

export default packageOffersRouter;