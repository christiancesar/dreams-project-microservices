import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { CreateHotelBody } from "../../../schemas/hotels.js";
import CreateHotelService from "../services/hotels/CreateHotelService.js";

export async function createHotel(request: ZodRequest<{ body: typeof CreateHotelBody }>, reply: FastifyReply) {
  const createHotelService = new CreateHotelService();

  const hotel = await createHotelService.execute(request.body);

  return reply.send(hotel);
}
