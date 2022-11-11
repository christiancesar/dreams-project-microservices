import { Router } from "express";
import { FlightController } from "../controllers/FlightController";

const flightsRoutes = Router();
const flightController = new FlightController();

flightsRoutes.patch('/', flightController.update) 

export default flightsRoutes;