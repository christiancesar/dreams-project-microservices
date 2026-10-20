import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { HotelUserParams } from "../../../schemas/hotels";
import ListHotelsByUserService from "../services/hotelsUser/ListHotelsByUserService";

export async function listHotelsByUser(request: ZodRequest<{ params: typeof HotelUserParams }>, reply: FastifyReply) {
  const listHotelsByUserService = new ListHotelsByUserService();

  const hotels = await listHotelsByUserService.execute({ userId: request.params.userId });

  return reply.send(hotels);
}
