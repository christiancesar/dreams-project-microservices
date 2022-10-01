import { Router } from "express";
import { FlightsController } from "../controllers/FlightsController";
import flightsOffersRouter from "./flightsOffersRouter";
import flightsUserRouter from "./flightsUserRouter";


const flightsRouter = Router();
const flightsController = new FlightsController();

flightsRouter.use('/offers', flightsOffersRouter);
flightsRouter.use('/user', flightsUserRouter)

flightsRouter.get('/:flightId', flightsController.show);

flightsRouter.get('/', flightsController.index);

flightsRouter.post('/', flightsController.create);


export default flightsRouter