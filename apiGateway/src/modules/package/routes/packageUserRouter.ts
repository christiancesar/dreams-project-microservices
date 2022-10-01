import { Router } from "express";
import PackageUserController from "../controllers/PackageUserController";

const packageUserRouter = Router();
const packageUserController = new PackageUserController();

packageUserRouter.get('/:userId', packageUserController.index)

export default packageUserRouter