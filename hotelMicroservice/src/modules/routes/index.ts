import { Router } from "express";
import { HotelController } from "../controllers/HotelController";

const hotelsRoutes = Router();
const hotelController = new HotelController();

hotelsRoutes.patch('/', hotelController.update) 

export default hotelsRoutes;