import { Router } from "express";
import { HotelOffersController } from "../controllers/HotelOffersController";

const hotelsOffersRouter = Router()
const hotelOffersController = new HotelOffersController();

hotelsOffersRouter.get('/', hotelOffersController.index)

export default hotelsOffersRouter;