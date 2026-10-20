import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { HotelUserParams } from "../../../schemas/hotels.js";
import ListHotelsByUserService from "../services/hotelsUser/ListHotelsByUserService.js";

export async function listHotelsByUser(request: ZodRequest<{ params: typeof HotelUserParams }>, reply: FastifyReply) {
  const listHotelsByUserService = new ListHotelsByUserService();

  const hotels = await listHotelsByUserService.execute({ userId: request.params.userId });

  return reply.send(hotels);
}
