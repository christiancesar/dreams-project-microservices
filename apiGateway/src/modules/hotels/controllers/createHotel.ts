import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { CreateHotelBody } from "../../../schemas/hotels";
import CreateHotelService from "../services/hotels/CreateHotelService";

export async function createHotel(request: ZodRequest<{ body: typeof CreateHotelBody }>, reply: FastifyReply) {
  const createHotelService = new CreateHotelService();

  const hotel = await createHotelService.execute(request.body);

  return reply.send(hotel);
}
