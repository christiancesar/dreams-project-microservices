import { FastifyReply } from "fastify";
import { HotelUserParams } from "../../../schemas/hotels";
import ListHotelsByUserService from "../services/hotelsUser/ListHotelsByUserService";

class HotelUserController {
  async index(params: HotelUserParams, reply: FastifyReply) {
    const listHotelsByUserService = new ListHotelsByUserService();
    const hotels = await listHotelsByUserService.execute({ userId: params.userId });
    return reply.send(hotels)
  }
}

export default HotelUserController;
