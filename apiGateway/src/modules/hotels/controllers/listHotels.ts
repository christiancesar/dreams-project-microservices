import { FastifyReply, FastifyRequest } from "fastify";
import ListHotelsService from "../services/hotels/ListHotelsService";

export async function listHotels(_request: FastifyRequest, reply: FastifyReply) {
  const listHotelsService = new ListHotelsService();

  const hotels = await listHotelsService.execute();

  return reply.send(hotels);
}
