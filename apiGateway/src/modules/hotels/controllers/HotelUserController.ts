import { Request, Response } from "express";
import ListHotelsByUserService from "../services/hotelsUser/ListHotelsByUserService";

class HotelUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listHotelsByUserService = new ListHotelsByUserService();
    const hotels = await listHotelsByUserService.execute({ userId });
    return response.json(hotels)
  }
}

export default HotelUserController;