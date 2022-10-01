import { Router } from "express";
import FlightsOffersController from "../controllers/FlightsOffersController";


const flightsOffersRouter = Router()
const flightsOffersController = new FlightsOffersController();

flightsOffersRouter.get('/', flightsOffersController.index)

export default flightsOffersRouter