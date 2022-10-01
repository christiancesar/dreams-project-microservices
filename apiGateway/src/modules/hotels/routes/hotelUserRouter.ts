import { Router } from "express";
import HotelUserController from "../controllers/HotelUserController";


const hotelUserRouter = Router()

const hotelUserController = new HotelUserController();

hotelUserRouter.get('/:userId', hotelUserController.index);

export default hotelUserRouter;