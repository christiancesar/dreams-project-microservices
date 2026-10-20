import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { HotelIdParams } from "../../../schemas/hotels";
import ShowHotelService from "../services/hotels/ShowHotelService";

export async function showHotel(request: ZodRequest<{ params: typeof HotelIdParams }>, reply: FastifyReply) {
  const showHotelService = new ShowHotelService();

  const hotel = await showHotelService.execute({ hotelId: request.params.hotelId });

  return reply.send(hotel);
}
