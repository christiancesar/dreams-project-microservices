import { Router } from "express";
import PackageController from "../controllers/PackageController";
import packageOffersRouter from "./packageOffersRouter";
import packageUserRouter from "./packageUserRouter";

const packageRouter = Router();
const packageController = new PackageController();

packageRouter.use('/offers', packageOffersRouter);

packageRouter.use('/user', packageUserRouter);

packageRouter.post('/', packageController.create);
packageRouter.get('/', packageController.index);

export default packageRouter;