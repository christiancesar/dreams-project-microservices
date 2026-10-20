import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { HotelIdParams } from "../../../schemas/hotels.js";
import ShowHotelService from "../services/hotels/ShowHotelService.js";

export async function showHotel(request: ZodRequest<{ params: typeof HotelIdParams }>, reply: FastifyReply) {
  const showHotelService = new ShowHotelService();

  const hotel = await showHotelService.execute({ hotelId: request.params.hotelId });

  return reply.send(hotel);
}
