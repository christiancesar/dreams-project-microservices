import { Router } from "express";
import HotelsController from "../controllers/HotelsController";
import hotelsOffersRouter from "./hotelsOffersRouter";
import hotelUserRouter from "./hotelUserRouter";


const hotelRouter = Router();
const hotelsController = new HotelsController();

hotelRouter.use('/offers', hotelsOffersRouter);
hotelRouter.use('/user', hotelUserRouter);

hotelRouter.post('/', hotelsController.create);
hotelRouter.get('/:hotelId', hotelsController.show);
hotelRouter.get('/', hotelsController.index);

export default hotelRouter;

